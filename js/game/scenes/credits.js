define(['system/lib/scene', 'game/entity/back', 'system/basic/text', 'system/geo/vector2'],
		function(Scene, BackButton, TextEntity, Vector2) {
			function CreditsScene() {
				this.center(new TextEntity(new Vector2(0, 100), "Max Mustermann"));
				this.center(new TextEntity(new Vector2(0, 200), "Erica Mustemann"));
				this.center(new TextEntity(new Vector2(0, 300), "Gunda Gamedesigner"));
				this.center(new TextEntity(new Vector2(0, 400), "Peter Programmierer"));
				this.center(BackButton('menu'));
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);