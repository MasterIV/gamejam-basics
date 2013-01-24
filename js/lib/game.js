window.requestAnimFrame = (function(){
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function( callback, element ){window.setTimeout(callback, 25);};
})();

var game = {
	frames: 0,
	fps: 25,

	scene: null,
	lastUpdate: 0,

	display: null,
	displayCtx: null,
	buffer: null,
	bufferCtx: null,

	init: function() {
		this.display = document.getElementById('gameframe');
		this.displayCtx = this.display.getContext('2d');

		this.buffer = document.createElement('canvas');
		this.bufferCtx = this.buffer.getContext('2d');
		this.buffer.width = this.display.width;
		this.buffer.height = this.display.height;

		var self = this;
		setInterval( function() { self.updateFramerate(); }, 1000 );

		this.lastUpdate = Date.now();
		this.loop();
	},

	updateFramerate: function() {
		this.fps = this.frames;
		this.frames = 0;
	},

	loop: function() {
		var now = Date.now();
		var delta = now - this.lastUpdate;

		if( delta < 250 && this.scene ) {
			this.update( delta );
			this.draw();
		}

		this.lastUpdate = now;
		this.frames++;

		var self = this;
		requestAnimFrame( function() { self.loop(); });
	},

	update: function( delta ) {
		this.scene.update( delta );
	},

	draw: function() {
		this.scene.draw( this.bufferCtx );

		this.display.width = this.display.width;
		this.displayCtx.drawImage( this.buffer, 0, 0 );

		// fsps display
		this.displayCtx.fillStyle = 'white';
		this.displayCtx.font = '10px monospace';
		this.displayCtx.fillText( this.fps, 600, 460 );
	}
}