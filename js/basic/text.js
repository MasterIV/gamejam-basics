define(['basic/entity', 'config/fonts'],
		function(Entity, fonts) {
			function TextEntity(pos, text, font) {
				Entity.call(this, pos);
				this.text = text;
				this.font = font || fonts.default;
			}

			TextEntity.prototype = new Entity();

			TextEntity.prototype.onDraw = function(ctx) {
				this.font.apply(ctx, this.hover());
				ctx.fillText(this.text, 0, 0);
			};

			return TextEntity;
		}
);