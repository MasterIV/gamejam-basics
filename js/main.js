define(
	['config/scenes', 'config/config', 'core/graphic', 'core/mouse', 'core/controls', 'core/sound', 'core/game'],
	function (scenes, config, graphics, mouse, controls, sound, game) {
		graphics.load(function() {
			document.getElementById('loading').style.display = 'none';

			controls.init();
			mouse.init();
			sound.load();
			scenes.init();

			var scene = scenes.default;

			if(config.debug) {
				var hash = location.hash.substr(1);
				if( hash && scenes[hash] ) scene = scenes[hash];
			}

			game.init(scene);
		});
	}
);