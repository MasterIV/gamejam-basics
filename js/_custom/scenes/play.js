define(['_framework/lib/scene', '_custom/entity/player', '_framework/lib/map', '_framework/lib/viewport', '_framework/basic/rect', '_custom/config/colors', '_framework/geo/v2'],
		function(Scene, Player, TiledMap, ViewPort, RectEntity, colors, V2 ) {
			function PlayScene() {

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