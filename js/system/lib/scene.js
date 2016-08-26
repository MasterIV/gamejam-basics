define(['system/basic/entity', 'system/geo/v2', 'system/core/graphic', 'game/config/screen', 'game/config/config'],
		function (Entity, V2, graphics, screen, config) {
		    function Scene() {
				Entity.call(this, Zero(), new V2(screen.w, screen.h));
				this.keyAware = [];
			    this.bgColor = "#DDD";
			}

			Scene.prototype = new Entity();

			Scene.prototype.onDraw = function (ctx) {
				if (config.debug) {
					ctx.fillStyle = this.bgColor;
				}
				ctx.fillRect(0, 0, this.size.x, this.size.y);
				if (this.bg) {
					ctx.drawImage(graphics[this.bg], 0, 0);
				}
			};

			Scene.prototype.up = function (key) {
				this.dispatch(this.keyAware, 'up', key);
			};

			Scene.prototype.down = function (key) {
				this.dispatch(this.keyAware, 'down', key);
			};

			return Scene;
		}
);
