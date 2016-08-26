define(['geo/v2', 'core/game', 'config/config'], function (V2, game, config) {
	var mouse = new V2(0, 0);

	mouse.init = function () {
		var self = this;
		var gameframe = document.getElementById('gameframe');
		var primaryTouchId = null;

		var getPrimaryTouch = function (touches) {
			for (var i = 0, j = touches.length; i < j; i++) {
				if (touches[i].identifier == primaryTouchId) {
					return touches[i];
				}
			}

			return null;
		};

		gameframe.onmousemove = function (ev) {
			self.x = ( ev.clientX - gameframe.offsetLeft ) / game.scale;
			self.y = ( ev.clientY - gameframe.offsetTop ) / game.scale;
		};

		gameframe.onclick = function (ev) {
			if (game.scene.click)
				game.scene.click(self);
		};

		gameframe.onmousedown = function (ev) {
			if (game.scene.mousedown)
				game.scene.mousedown(self);
		};

		gameframe.onmouseup = function (ev) {
			if (game.scene.mouseup)
				game.scene.mouseup(self);
		};

		/* Support for mobile devices */
		gameframe.ontouchstart = function (ev) {
			if (primaryTouchId == null) {
				this.onmousemove(ev.touches[0]);
				this.onmousedown(ev.touches[0]);
				primaryTouchId = ev.changedTouches[0].identifier;
			}

			ev.preventDefault();
		};

		gameframe.ontouchmove = function (ev) {
			var touch = getPrimaryTouch(ev.touches);

			if (touch != null) {
				this.onmousemove(touch);
			}

			ev.preventDefault();
		};

		gameframe.ontouchend = function (ev) {
			var touch = getPrimaryTouch(ev.changedTouches);

			if (touch != null) {
				this.onmouseup(touch);
				this.onclick(touch);
				primaryTouchId = null;
			}

			ev.preventDefault();
		};

		/* Support for mouse or touch leaving the game */
		gameframe.onmouseout = function (ev) {
			gameframe.onmouseup(ev);
		};

	};

	if (!config.debug)
		document.addEventListener("contextmenu", function (e) {
			e.preventDefault();
		}, false);

	return mouse;
});
