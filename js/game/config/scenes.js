define(['game/scenes/menu', 'game/scenes/credits', 'game/scenes/play', 'game/scenes/help'],
		function (MenuScene, CreditsScene, PlayScene, HelpScene) {
			return {
				init: function () {
					this.menu = new MenuScene();
					this.credits = new CreditsScene();
					this.play = new PlayScene();
					this.help = new HelpScene();
					this.default = this.menu;
				}
			};
		}
);