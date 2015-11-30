var config = {
	debug: true
};

var colors = {
	button: new Colors()
};

var scenes = {
	default: null,
	init: function() {
		this.menu = new MenuScene();
		this.credits = new CreditsScene();
		this.play = new PlayScene();
		this.help = new HelpScene();
		this.default = this.menu;
	}
};

/** Required Configuration for display */
var screen = {
	w: 800,
	h: 600,
	scale: true
};