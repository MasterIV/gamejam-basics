define(['_custom/scenes/menu', '_custom/scenes/credits', '_custom/scenes/play', '_custom/scenes/help'],
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