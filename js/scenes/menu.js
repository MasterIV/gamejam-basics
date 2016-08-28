define(['lib/scene', 'basic/button', 'core/game', 'geo/v2', 'transitions/slideinright', 'basic/morph', 'definition/easing', 'basic/layout'],
	function(Scene, Button, game, V2, SlideInRightTransition, Morph, Easing, Layout) {
		function MenuScene() {
			Scene.call(this);

			var playButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').play; }).rect(280, 80).text("Play");
			var creditsButton = Button.create(new V2(0, 680), function() { game.scene = new SlideInRightTransition(require('config/scenes').credits, 1000, Easing.OUTQUAD); }).rect(360, 80).text("Credits");
			var helpButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').help; }).rect(300, 80).text("Help");
			var particlesButton = Button.create(new V2(0, 680), function() { game.scene = require('config/scenes').particles; }).rect(300, 80).text("Particles");

			var vLayout = new Layout.vertical(new V2(0, 20), 20, 50);
			vLayout.add(playButton);
			vLayout.add(creditsButton);
			vLayout.add(helpButton);
			vLayout.add(particlesButton);
			vLayout.align("center");
			this.center(vLayout);

			//var easing = Easing.OUTELASTIC;
			//var self = this;

			//playButton.add(new Morph({ position: { y: 100 } }, 1500, easing));
			//creditsButton.add(new Morph({ position: { y: 250 } }, 1500, easing));
			//helpButton.add(new Morph({ position: { y: 400 } }, 1500, easing));
		}

		MenuScene.prototype = new Scene();

		return MenuScene;
	}
);
