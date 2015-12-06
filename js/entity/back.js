define(['require', 'basic/button', 'core/graphic', 'core/game', 'geo/v2'],
	function(require, Button, graphics, game, V2) {
		graphics.add('img/back.png');

		function BackButton(scene) {
			return Button.create(new V2(0, 500), function() { game.scene = require('config/scenes')[scene]; }).img('img/back.png');
		}

		return BackButton;
	}
);