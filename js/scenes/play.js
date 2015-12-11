define(['lib/scene', 'entity/player', 'lib/map', 'lib/viewport', 'basic/rect', 'config/colors', 'geo/v2'],
		function(Scene, Player, TiledMap, ViewPort, RectEntity, colors, V2 ) {
			function PlayScene() {
				Scene.call(this);

				var player = new Player(new V2(500, 500));
				var map = new TiledMap('map');
				var viewport = new ViewPort(true);
				viewport.add(map.render(['bg', 'Below']));
				viewport.add(player);
				viewport.add(map.render(['More']));
				viewport.add(new RectEntity(new V2(1000, 900), new V2(100, 100), colors.default));

				//viewport.follow(player);
				//viewport.dragable(true);
				viewport.scrollTo(new V2(-200,-200), 3000, function() {
					viewport.dragable(true);
				});

				this.add(viewport);
				this.keyAware.push(player);
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);