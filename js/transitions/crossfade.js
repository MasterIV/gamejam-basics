define(['lib/transition'],
		function(TransitionScene) {

			function CrossfadeTransition(fromScene, toScene, duration) {
				TransitionScene.call(this, fromScene, toScene, duration);
			}

			CrossfadeTransition.prototype = new TransitionScene();
			CrossfadeTransition.prototype.constructor = CrossfadeTransition;
			
			CrossfadeTransition.prototype.performTransition = function(ctx) {
				ctx.drawImage(this.fromBuffer.buffer, 0, 0);
				ctx.globalAlpha = this.progress;
				ctx.drawImage(this.toBuffer.buffer, 0, 0);				
			}
						
			return CrossfadeTransition;
			
		}
);