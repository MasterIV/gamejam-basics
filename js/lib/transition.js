define(['lib/scene', 'basic/entity', 'core/game', 'basic/morph'],
		function(Scene, Entity, game, Morph) {

			function TransitionScene(toScene, duration, easing) {
				Scene.call(this);
				
				if(game.scene) this.add(this.fromScene = game.scene);
				if(toScene) this.add(this.toScene = toScene);
								
				this.fromBuffer = this.createBuffer();
				this.toBuffer = this.createBuffer();
				
				this.progress = 0;
				this.add(new Morph({progress: 1}, duration, easing, this.endTransition.bind(this)));
			}

			TransitionScene.prototype = new Scene();
			TransitionScene.prototype.constructor = TransitionScene;
			
			TransitionScene.prototype.createBuffer = function() {
				var buffer = document.createElement('canvas');
				buffer.width = this.size.x;
				buffer.height = this.size.y;
				var ctx = buffer.getContext('2d');
				return { buffer: buffer, ctx: ctx };
			};
			
			TransitionScene.prototype.draw = function (ctx) {
				ctx.save();
				
				this.fromScene.draw(this.fromBuffer.ctx);
				this.toScene.draw(this.toBuffer.ctx);
				this.performTransition(ctx);

				ctx.restore();
			};
			
			TransitionScene.prototype.endTransition = function() {
				game.scene = this.toScene;
			};
			
			TransitionScene.prototype.performTransition = function(ctx) {
				// override in derived functions
				ctx.drawImage(this.toBuffer.buffer, 0, 0);				
			};
						
			TransitionScene.prototype.click = function (pos) {
				this.toScene.click(pos);
			};

			TransitionScene.prototype.mousedown = function (pos) {
				this.toScene.mousedown(pos);
			};
		
			TransitionScene.prototype.mouseup = function (pos) {
				this.toScene.mouseup(pos);
			};
			
			return TransitionScene;
			
		}
);