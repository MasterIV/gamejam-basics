define(['geo/v2'],
	function(V2) {
		function GridCollider(subject, map, obstacles) {
			this.subject = subject;
			this.map = map;
			this.obstacles = obstacles || [];
		}

		GridCollider.prototype.move = function( move ) {
			var t = this.map.tile;
			var steps = Math.ceil(Math.max( Math.abs( move.x )/t.x, Math.abs( move.y )/t.y));
			var collision = {x: false, y: false};

			if( steps > 1 ) {
				move.div( steps );

				for( var i = 0; i < steps && (move.x || move.y); i++) {
					this.checkCollisionStep( move, collision );
					if( collision.x ) move.x = 0;
					if( collision.y ) move.y = 0;
				}
			} else {
				this.checkCollisionStep( move, collision );
			}
		};

		GridCollider.prototype.checkHorizontalCollision = function(move, pos, collision) {
			if (!move.x) return;

			var t = this.map.tile;
			var s = this.subject.size;
			var p = this.subject.position;

			var pxOffsetX = (move.x > 0 ? s.x : 0);
			var tileOffsetX = ( move.x < 0 ? t.x : 0);

			var firstTileY = Math.floor(pos.y / t.y);
			var lastTileY = Math.ceil((pos.y + s.y) / t.y);
			var tileX = Math.floor((pos.x + move.x + pxOffsetX) / t.x);

			for (var tileY = firstTileY; tileY < lastTileY; tileY++) {
				if (this.map.blocked(new V2(tileX, tileY))) {
					collision.x = true;
					p.x = tileX * t.x - pxOffsetX + tileOffsetX;
					return;
				}
			}

			var a = this.subject.getArea().moved(new V2(p.x, pos.y));
			for (var i in this.obstacles) {
				var o = this.obstacles[i];
				if (( move.x > 0 && o.position.x > p.x) || (move.x < 0 && o.position.x < p.x))
					if (o.relativeArea().collision(a)) {
						collision.x = true;
						p.x = tileX * t.x - pxOffsetX + tileOffsetX;
						return;
					}
			}
		};

		GridCollider.prototype.checkVerticalCollision = function(move, pos, collision) {
			if( !move.y ) return;

			var t = this.map.tile;
			var s = this.subject.size;
			var p = this.subject.position;

			var pxOffsetY = ( move.y > 0 ? s.y : 0);
			var tileOffsetY = ( move.y < 0 ? t.y : 0);

			var firstTileX = Math.floor( p.x / t.x );
			var lastTileX = Math.ceil(( p.x + s.x ) / t.x );
			var tileY = Math.floor(( pos.y + move.y + pxOffsetY) / t.y );

			for(var tileX = firstTileX; tileX < lastTileX; tileX++) {
				if( this.map.blocked(new V2(tileX, tileY ))) {
					collision.y = true;
					p.y = tileY * t.y - pxOffsetY + tileOffsetY;
					return;
				}
			}

			var a = this.subject.getArea().moved(new V2(pos.x, p.y));
			for (var i in this.obstacles) {
				var o = this.obstacles[i];
				if (( move.y > 0 && o.position.y > p.y) || (move.y < 0 && o.position.y < p.y))
					if (o.relativeArea().collision(a)) {
						collision.y = true;
						p.y = tileY * t.y - pxOffsetY + tileOffsetY;
						return;
					}
			}
		};

		GridCollider.prototype.checkCollisionStep = function( move, collision ) {
			var pos = this.subject.position.clone();
			this.subject.position.add( move );

			this.checkHorizontalCollision(move, pos, collision);
			this.checkVerticalCollision(move, pos, collision);
		};

		GridCollider.factory = function(map, obstacles) {
			return function(subject) {
				return new GridCollider(subject, map, obstacles);
			}
		};

		return GridCollider;
	}
);