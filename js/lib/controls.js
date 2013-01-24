var controls = {
	init: function() {
		var self = this;
		document.onkeydown = function( e ) { self.down(e); };
		document.onkeyup   = function( e ) { self.up(e); };
	},

	emit: function( type, key ) {
		if( game.scene && game.scene[type] )
			game.scene[type]( key );
	},

	translate: function( type, code ) {
		switch( code ) {
			case 116: return true; break; // F5
			case 32: this.emit( type, 'space' ); break;
			case 27: this.emit( type, 'esc' ); break;
			case 13: this.emit( type, 'enter' ); break;

			case 38: case 87: this.emit( type, 'up' ); break;
			case 40: case 83: this.emit( type, 'down' ); break;
			case 37: case 65: this.emit( type, 'left' ); break;
			case 39: case 68: this.emit( type, 'right' ); break;
		}

		return false;
	},

	down: function(evt) {
		evt = (evt) ? evt : ((event) ? event : null);
		return this.translate( 'down', evt.keyCode );

	},

	up: function(evt) {
		evt = (evt) ? evt : ((event) ? event : null);
		return this.translate( 'up', evt.keyCode );
	}
}