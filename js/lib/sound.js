var sound = {
	urls: [],

	add: function( url ) {
		this.urls.push( url );
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
				this[url] = new Audio(url);
				this[url].oncanplaythrough = complete;
				this[url].onended = function() { self.urls[file].push( this ); };
			}
		}

		if( total == 0 && callback ) callback();
	},

	play: function( url ) {
		var self = this;

		if( typeof this[url] != 'undefined' )
			return this[url].play();

		this[url] = new Audio( url );
		return this[url].play();
	},
}