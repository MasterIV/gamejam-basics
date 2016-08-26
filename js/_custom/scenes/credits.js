define(['_framework/lib/scene', '_custom/entity/back', '_framework/basic/text', '_framework/geo/v2'],
		function(Scene, BackButton, TextEntity, V2) {
			function CreditsScene() {
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