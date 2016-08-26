define(['system/lib/scene', 'game/entity/player', 'system/lib/map', 'system/lib/viewport', 'system/basic/rect', 'game/config/colors', 'system/geo/vector2'],
		function(Scene, Player, TiledMap, ViewPort, RectEntity, colors, Vector2 ) {
			function PlayScene() {

				var player = new Player(new Vector2(500, 500));
				var map = new TiledMap('map');
				var viewport = new ViewPort(true);
				viewport.add(map.render(['bg', 'Below']));
				viewport.add(player);
				viewport.add(map.render(['More']));
				viewport.add(new RectEntity(new Vector2(1000, 900), new Vector2(100, 100), colors.default));

				//viewport.follow(player);
				//viewport.dragable(true);
				viewport.scrollTo(new Vector2(-200,-200), 3000, function() {
					viewport.dragable(true);
				});

				this.add(viewport);
				this.keyAware.push(player);
			}

			PlayScene.prototype = new Scene();

			return PlayScene;
		}
);