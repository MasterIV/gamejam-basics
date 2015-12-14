define(['lib/scene', 'basic/entity', 'core/game'],
		function(Scene, Entity, game) {

			function TransitionScene(fromScene, toScene, duration) {
				Scene.call(this);
				
				if(fromScene) this.add(this.fromScene = fromScene);
				if(toScene) this.add(this.toScene = toScene);
				
				this.duration = duration || 500;
				this.animationTime = 0;
				this.progress = 0;
				
				this.fromBuffer = this.createBuffer();
				this.toBuffer = this.createBuffer();
			}

			TransitionScene.prototype = new Scene();
			TransitionScene.prototype.constructor = TransitionScene;
			
			TransitionScene.prototype.createBuffer = function() {
				var buffer = document.createElement('canvas');
				buffer.width = this.size.x;
				buffer.height = this.size.y;
				var ctx = buffer.getContext('2d');
				return { buffer: buffer, ctx: ctx };
			}			
			
			TransitionScene.prototype.draw = function (ctx) {
				ctx.save();
				
				this.fromScene.draw(this.fromBuffer.ctx);
				this.toScene.draw(this.toBuffer.ctx);
				this.performTransition(ctx);

				ctx.restore();
			};
			
			TransitionScene.prototype.performTransition = function(ctx) {
				// override in derived functions
				ctx.drawImage(this.toBuffer.buffer, 0, 0);				
			}
			
			TransitionScene.prototype.update = function(delta) {
				Entity.prototype.update.call(this, delta);
				
				this.animationTime += delta;
				this.progress = Math.max(Math.min(this.animationTime / this.duration, 1), 0);
				if(this.progress == 1) {
					game.scene = this.toScene;
				}
			}
			
			TransitionScene.prototype.click = function (pos) {
				this.toScene.click(pos);
			}

			TransitionScene.prototype.mousedown = function (pos) {
				this.toScene.mousedown(pos);
			}
		
			TransitionScene.prototype.mouseup = function (pos) {
				this.toScene.mouseup(pos);
			}
			
			return TransitionScene;
			
		}
);