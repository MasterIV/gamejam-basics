var s = {
	sampels: [],

	play: function( file ) {
		var self = this;

		if( !this.sampels[file] )
			this.sampels[file] = [];

		if( this.sampels[file].length ) {
			var sound = this.sampels[file].pop();
			sound.play();
			return sound;
		} else {
			var sound = new Audio( file );
			sound.onended = function() { self.sampels[file].push( this ); };
			sound.play();
			return sound;
		}
	}
};
