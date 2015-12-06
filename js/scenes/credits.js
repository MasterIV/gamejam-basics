define(['lib/scene', 'entity/back', 'basic/text', 'geo/v2'],
		function(Scene, BackButton, TextEntity, V2) {
			function CreditsScene() {
				Scene.call(this);
				this.center(new TextEntity(new V2(0, 100), "Max Mustermann"));
				this.center(new TextEntity(new V2(0, 200), "Erica Mustemann"));
				this.center(new TextEntity(new V2(0, 300), "Gunda Gamedesigner"));
				this.center(new TextEntity(new V2(0, 400), "Peter Programmierer"));
				this.center(BackButton('menu'));
			}

			CreditsScene.prototype = new Scene();

			return CreditsScene;
		}
);