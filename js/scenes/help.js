define(['lib/scene', 'entity/back'],
		function(Scene, BackButton) {

			function HelpScene() {
				this.center(BackButton('menu'));
			}

			HelpScene.prototype = new Scene();

			return HelpScene;
		}
);