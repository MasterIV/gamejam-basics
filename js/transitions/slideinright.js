define(['lib/transition'],
		function(TransitionScene) {

			function SlideInRightTransition(toScene, duration, easing) {
				TransitionScene.call(this, toScene, duration, easing);
			}

			SlideInRightTransition.prototype = new TransitionScene();
			SlideInRightTransition.prototype.constructor = SlideInRightTransition;
			
			SlideInRightTransition.prototype.performTransition = function(ctx) {
				var offset = this.progress * this.size.x;
				ctx.drawImage(this.fromBuffer.buffer, offset, 0);
				ctx.drawImage(this.toBuffer.buffer, -this.size.x + offset, 0);				
			}
						
			return SlideInRightTransition;
			
		}
);