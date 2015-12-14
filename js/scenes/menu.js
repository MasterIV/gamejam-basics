define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing'],
	function(Scene, Button, game, V2, CrossfadeTransition, Morph, Easing) {
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').play; }).rect(300, 80).text("Play");
			var creditsButton = Button.create(new V2(0, 680), function() { game.scene = new CrossfadeTransition(game.scene, require('config/scenes').credits); }).rect(300, 80).text("Credits");
			var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help");
		
			this.center(playButton);
			this.center(creditsButton);
			this.center(helpButton);

			var easing = Easing.OUTELASTIC;
			this.add(new Morph(playButton, { position: { y: 100 } }, 1500, easing));
			this.add(new Morph(creditsButton, { position: { y: 250 } }, 1500, easing));
			this.add(new Morph(helpButton, { position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
