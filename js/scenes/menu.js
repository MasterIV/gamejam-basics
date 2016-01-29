define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing'],
	function(Scene, Button, game, V2, SlideInRightTransition, Morph, Easing) {
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').play; }).rect(300, 80).text("Play");
			var creditsButton = Button.create(new V2(0, 680), function() { game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD); }).rect(300, 80).text("Credits");
			var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help");
		
			this.center(playButton);
			this.center(creditsButton);
			this.center(helpButton);

			var easing = Easing.OUTELASTIC;
			var self = this;

			playButton.add(new Morph({ position: { y: 100 } }, 1500, easing));
			creditsButton.add(new Morph({ position: { y: 250 } }, 1500, easing));
			helpButton.add(new Morph({ position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
