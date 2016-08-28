var Zero;

define(function() {
	function V2( x, y ) {
		this.x = x;
		this.y = y;
	}

	V2.prototype.sum = function( v ) { return new V2( this.x+v.x, this.y+v.y ); };
	V2.prototype.add = function( v ) { this.x += v.x; this.y += v.y; return this; };

	V2.prototype.dif = function( v ) { return new V2( this.x-v.x, this.y-v.y ); };
	V2.prototype.sub = function( v ) { this.x -= v.x; this.y -= v.y; return this; };

	V2.prototype.prd = function( s ) { return new V2( this.x*s, this.y*s ); };
	V2.prototype.mul = function( s ) { this.x *= s; this.y *= s; return this; };

	V2.prototype.quo = function( s ) { return new V2( this.x/s, this.y/s ); };
	V2.prototype.div = function( s ) { this.x /= s; this.y /= s; return this; };

	V2.prototype.angle = function( v ) { return Math.atan2( v.y-this.y, v.x-this.x ); };
	V2.prototype.dist = function( v ) { return Math.sqrt( Math.pow( v.x-this.x, 2 ) + Math.pow( v.y - this.y, 2)); };

	V2.prototype.grid = function( w, h ) { this.x = Math.floor( this.x / w ); this.y = Math.floor( this.y / h ); };
	V2.prototype.invert = function() { this.x *= -1; this.y *= -1;};
	V2.prototype.inverse = function() { return new V2( this.x * -1, this.y * -1 );};

	V2.prototype.clone = function() { return new V2( this.x, this.y ); };
	V2.prototype.equal = function( v ) { return v.x == this.x && v.y == this.y };
	V2.prototype.abs = function() { return new V2( Math.abs(this.x), Math.abs(this.y)); };

	V2.prototype.fromDeg = function (angle, length) {
		this.fromRad(angle * ( Math.PI / 180 ), length);
	};

	V2.prototype.fromRad = function (angle, length) {
		this.x = Math.round(Math.sin(angle) * length);
		this.y = -Math.round(Math.cos(angle) * length);
	};

	V2.fromDeg = function (angle, length) {
		return V2.fromRad(angle * ( Math.PI / 180 ), length);
	};

	V2.fromRad = function (angle, length) {
		var x = Math.round(Math.sin(angle) * length);
		var y = -Math.round(Math.cos(angle) * length);
		return new V2(x, y);
	};

	Zero = function() {
		return new V2(0,0);
	};

	return V2;


});