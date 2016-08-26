define(['require', '_framework/basic/button', '_framework/core/graphic', '_framework/core/game', '_framework/geo/v2', '_framework/transitions/slideinleft', '_framework/definition/easing'],
	function(require, Button, graphics, game, V2, SlideInLeftTransition, Easing) {
		graphics.add('img/back.png');

		function BackButton(scene) {
			return Button.create(new V2(0, 500), function() { game.scene = new SlideInLeftTransition(require('_custom/config/scenes')[scene], 1000, Easing.OUTQUAD); }).img('img/back.png');
		}

		return BackButton;
	}
);