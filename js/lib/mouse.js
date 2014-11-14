var mouse = new V2( 0, 0 );

mouse.init = function() {
	var self = this;
	var gameframe = document.getElementById('gameframe');

	gameframe.onmousemove = function( ev ) {
		self.x = ev.clientX - gameframe.offsetLeft;
		self.y = ev.clientY - gameframe.offsetTop;
	};

	gameframe.onclick = function( ev ) {
		if( game.scene.click )
			game.scene.click( self );
	};

	gameframe.onmousedown = function( ev ) {
		if( game.scene.mousedown )
			game.scene.mousedown( self );
	};

	gameframe.onmouseup = function( ev ) {
		if( game.scene.mouseup )
			game.scene.mouseup( self );
	};

	/* Support for mobile devices */
	gameframe.ontouchstart = function( ev ) {
		this.onmousemove( ev.changedTouches[0] );
		this.onmousedown( ev.changedTouches[0] );
		ev.preventDefault();

	}

	gameframe.ontouchmove = function( ev ) {
		this.onmousemove( ev.changedTouches[0] );
		ev.preventDefault();
	}

	gameframe.ontouchend = function( ev ) {
		this.onmouseup( ev.changedTouches[0] );
		this.onclick( ev.changedTouches[0] );

		self.x = -1;
		self.y = -1;

		ev.preventDefault();
	}
};
