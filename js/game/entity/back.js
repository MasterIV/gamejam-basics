define(['require', 'system/basic/button', 'system/core/graphic', 'system/core/game', 'system/geo/vector2', 'system/transitions/slideinleft', 'system/definition/easing'],
	function(require, Button, graphics, game, Vector2, SlideInLeftTransition, Easing) {
		graphics.add('img/back.png');

		function BackButton(scene) {
			return Button.create(new Vector2(0, 500), function() { game.scene = new SlideInLeftTransition(require('game/config/scenes')[scene], 1000, Easing.OUTQUAD); }).img('img/back.png');
		}

		return BackButton;
	}
);