define(['system/core/graphic', 'system/geo/vector2', 'system/basic/entity'],
		function(graphics, Vector2, Entity) {
			function ImageEntity(pos, src, scale) {
				this.img = graphics[src];
				Entity.call(this, pos, new Vector2(this.img.width, this.img.height));
				this.scale = scale || 1;
			}

			ImageEntity.prototype = new Entity();

			ImageEntity.prototype.onDraw = function(ctx) {
				if(this.size.x >= 1 && this.size.y >= 1)
					ctx.drawImage(this.img, 0, 0, this.size.x | 0, this.size.y | 0, 0, 0, (this.size.x * this.scale) | 0, (this.size.y * this.scale) | 0);
			};

			return ImageEntity;
		}
);
