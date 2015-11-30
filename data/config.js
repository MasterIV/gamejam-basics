var config = {
	debug: true
};

var colors = {
	default: new Colors('#000', '#FFF', '#555', '#DDD')
};

var fonts = {
	default: new FontStyle(40, '#000', 'sans-serif', '#555' ),
	frames: new FontStyle(12, '#000', 'monospace' )
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