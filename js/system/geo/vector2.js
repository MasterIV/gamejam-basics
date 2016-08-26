var Zero;

define(function() {
	function Vector2( x, y ) {
		this.x = x;
		this.y = y;
	}

	Vector2.prototype.sum = function( v ) { return new Vector2( this.x+v.x, this.y+v.y ); };
	Vector2.prototype.add = function( v ) { this.x += v.x; this.y += v.y; return this; };

	Vector2.prototype.dif = function( v ) { return new Vector2( this.x-v.x, this.y-v.y ); };
	Vector2.prototype.sub = function( v ) { this.x -= v.x; this.y -= v.y; return this; };

	Vector2.prototype.prd = function( s ) { return new Vector2( this.x*s, this.y*s ); };
	Vector2.prototype.mul = function( s ) { this.x *= s; this.y *= s; return this; };

	Vector2.prototype.quo = function( s ) { return new Vector2( this.x/s, this.y/s ); };
	Vector2.prototype.div = function( s ) { this.x /= s; this.y /= s; return this; };

	Vector2.prototype.angle = function( v ) { return Math.atan2( v.y-this.y, v.x-this.x ); };
	Vector2.prototype.dist = function( v ) { return Math.sqrt( Math.pow( v.x-this.x, 2 ) + Math.pow( v.y - this.y, 2)); };

	Vector2.prototype.grid = function( w, h ) { this.x = Math.floor( this.x / w ); this.y = Math.floor( this.y / h ); };
	Vector2.prototype.invert = function() { this.x *= -1; this.y *= -1;};
	Vector2.prototype.inverse = function() { return new Vector2( this.x * -1, this.y * -1 );};

	Vector2.prototype.clone = function() { return new Vector2( this.x, this.y ); };
	Vector2.prototype.equal = function( v ) { return v.x == this.x && v.y == this.y };
	Vector2.prototype.abs = function() { return new Vector2( Math.abs(this.x), Math.abs(this.y)); };

	Zero = function() {
		return new Vector2(0,0);
	};

	return Vector2;


});