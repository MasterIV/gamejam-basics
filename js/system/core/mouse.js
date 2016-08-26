define(['system/geo/vector2', 'system/core/game', 'game/config/config'], function(Vector2, game, config) {
	var mouse = new Vector2( 0, 0 );

	mouse.init = function() {
		var self = this;
		var gameframe = document.getElementById('gameframe');

		gameframe.onmousemove = function (ev) {
			self.x = ( ev.clientX - gameframe.offsetLeft ) / game.scale;
			self.y = ( ev.clientY - gameframe.offsetTop ) / game.scale;
		};

		gameframe.onmousedown = function( ev ) {
			if( game.scene.mousedown )
				game.scene.mousedown( self );
		};

		gameframe.onmouseup = function( ev ) {
			if( game.scene.click )
				game.scene.click( self );
			if( game.scene.mouseup )
				game.scene.mouseup( self );
		};

		/* Support for mobile devices */
		gameframe.ontouchstart = function( ev ) {
			this.onmousemove( ev.changedTouches[0] );
			this.onmousedown( ev.changedTouches[0] );
			ev.preventDefault();

		};

		gameframe.ontouchmove = function( ev ) {
			this.onmousemove( ev.changedTouches[0] );
			ev.preventDefault();
		};

		gameframe.ontouchend = function( ev ) {
			this.onmouseup( ev.changedTouches[0] );

			self.x = -1;
			self.y = -1;

			ev.preventDefault();
		}
	};

	if(!config.debug)
		document.addEventListener("contextmenu", function(e){
			e.preventDefault();
		}, false);

	return mouse;
});
