define(['require', 'basic/button', 'core/graphic', 'core/game', 'geo/v2', 'transitions/slideinleft', 'definition/easing'],
	function(require, Button, graphics, game, V2, SlideInLeftTransition, Easing) {
		graphics.add('img/back.png');

		function BackButton(scene) {
			return Button.create(new V2(0, 500), function() { game.scene = new SlideInLeftTransition(require('config/scenes')[scene], 1000, Easing.OUTQUAD); }).img('img/back.png');
		}

		return BackButton;
	}
);