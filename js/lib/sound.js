var sound = {
	urls: [],
	urls: [],

	add: function( url ) {
		this.urls.push( url );
	},

	load: function( callback ) {
		var total = 0, loaded = 0;

		function complete() {
			if( ++loaded >= total ) callback();
		}

		while( this.urls.length ) {
			var url = this.urls.shift();
			if( typeof this[url] == 'undefined' ) {
				total++;
				this[url] = new Audio(url);
				this[url].oncanplaythrough = complete;
				this[url].onended = function() { self.urls[file].push( this ); };
			}
		}

		if( total == 0 ) callback();
	},

	play: function( url ) {
		var self = this;

		if( typeof this[url] != 'undefined' )
			return this[url].play();

		if( this.sampels[file].length ) {
			var sample = this.sampels[file].pop();
			sample.play();
			return sample;
		} else {
			var sample = new Audio( file );
			sample.onended = function() { self.sampels[file].push( this ); };
			sample.play();
			return s;
		}
	},

	add: function(url) {
		this.urls.push(url);
	},

	load: function( callback ) {
		var total = 0, loaded = 0;

		function complete() {
			if( ++loaded >= total && callback ) callback();
		}

		while( this.urls.length ) {
			var url = this.urls.shift();
			if( typeof this[url] == 'undefined' ) {
				total++;

				var sample = new Audio(url);
				sample.oncanplaythrough = complete;
				this.sampels[url] = [sample];
			}
		}

		if( total == 0 && callback ) callback();
	}
}