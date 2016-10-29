define(['basic/entity', 'geo/poly', 'config/colors', 'geo/v2', 'config/config'],
		function(Entity, Poly, colors, V2, config) {
			function PolyEntity(pos, vector_list, color) {
				this.color = color || colors.default;
				this.poly = new Poly(vector_list);

				// Be careful that a rectangle of 0, 0, size.x, size.y does not surround the polygon!
				// See PolyEntity.clearOffset()
				Entity.call(this, pos, this.poly.getSize());
			}

			PolyEntity.prototype = new Entity();

			PolyEntity.prototype.onDraw = function(ctx) {
				this.color.apply(ctx, this.hover());

				ctx.beginPath();

				var first = true;
				for ( var i = 0; i < this.poly.points.length; i++ ) {
					var point = this.poly.points[i];
					if (first) {
						ctx.moveTo(point.x, point.y);
						first = false;
					} else {
						ctx.lineTo(point.x, point.y);
					}
				}

				ctx.closePath();

				ctx.fill();
				ctx.stroke();

				if (config.debug) { // draws the surrounding rectangle of the polygon and the entity's position (red dot)
					var offset = this.poly.getOffset();
					ctx.strokeRect(offset.x, offset.y, this.size.x, this.size.y);
					ctx.fillStyle = '#ff0000';
					ctx.fillRect(-1,-1,3,3);
				}
			};

			PolyEntity.prototype.hover = function() {
				return this.poly.inside(this.relativeMouse());
			};

			// Ensures that the entity's position is equal to the the polygon surrounding rectangle's upper left corner
			// ### Will move the entity!
			PolyEntity.prototype.clearOffset = function() {
				var offset = this.poly.getOffset();
				this.poly.move(offset.inverse());
				this.position.add(offset);
			};

			return PolyEntity;
		}
);