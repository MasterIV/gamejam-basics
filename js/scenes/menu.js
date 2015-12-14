define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright'],
	function(Scene, Button, game, V2, CrossfadeTransition) {
		function MenuScene() {
			Scene.call(this);

			this.center(Button.create(new V2(0, 100), function() { game.scene = require('config/scenes').play; }).rect(300, 80).text("Play"));
			this.center(Button.create(new V2(0, 250), function() { game.scene = new CrossfadeTransition(game.scene, require('config/scenes').credits); }).rect(300, 80).text("Credits"));
			this.center(Button.create(new V2(0, 400), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help"));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
