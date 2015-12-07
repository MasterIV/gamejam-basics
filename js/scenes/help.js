define(['lib/scene', 'entity/back'],
		function(Scene, BackButton) {

			function HelpScene() {
				Scene.call(this);
				this.center(BackButton('menu'));
			}

			HelpScene.prototype = new Scene();

			return HelpScene;
		}
);