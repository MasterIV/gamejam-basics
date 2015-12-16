define(['lib/transition'],
		function(TransitionScene) {

			function DarkfadeTransition(toScene, duration, easing) {
				TransitionScene.call(this, toScene, duration, easing);
			}

			DarkfadeTransition.prototype = new TransitionScene();
			DarkfadeTransition.prototype.constructor = DarkfadeTransition;
			
			DarkfadeTransition.prototype.performTransition = function(ctx) {
				// Dark base
				ctx.fillStyle = "#000000";
				ctx.fillRect(0, 0, this.size.x, this.size.y);
				
				var opacity = Math.abs(this.progress - 0.5) * 2;
				ctx.globalAlpha = opacity;
				if(this.progress <= 0.5) {
					ctx.drawImage(this.fromBuffer.buffer, 0, 0);
				} else {
					ctx.drawImage(this.toBuffer.buffer, 0, 0);				
				}
			}
						
			return DarkfadeTransition;
			
		}
);