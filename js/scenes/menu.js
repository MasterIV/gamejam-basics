define(['lib/scene', 'basic/button', 'core/game', 'geo/v2'],
	function(Scene, Button, game, V2) {
		function MenuScene() {
			Scene.call(this);

			this.center(Button.create(new V2(0, 100), function() { game.scene = require('config/scenes').play; }).rect(300, 80).text("Play"));
			this.center(Button.create(new V2(0, 250), function() { game.scene = require('config/scenes').credits; }).rect(300, 80).text("Credits"));
			this.center(Button.create(new V2(0, 400), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help"));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
