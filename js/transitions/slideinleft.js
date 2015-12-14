define(['lib/transition'],
		function(TransitionScene) {

			function SlideInLeftTransition(fromScene, toScene, duration) {
				TransitionScene.call(this, fromScene, toScene, duration);
			}

			SlideInLeftTransition.prototype = new TransitionScene();
			SlideInLeftTransition.prototype.constructor = SlideInLeftTransition;
			
			SlideInLeftTransition.prototype.performTransition = function(ctx) {
				var offset = -this.progress * this.size.x;
				ctx.drawImage(this.fromBuffer.buffer, offset, 0);
				ctx.drawImage(this.toBuffer.buffer, this.size.x + offset, 0);				
			}
						
			return SlideInLeftTransition;
			
		}
);