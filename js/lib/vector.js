function V2( x, y ) {
	this.x = x;
	this.y = y;
}

V2.prototype.sum = function( v ) { return new V2( this.x+v.x, this.y+v.y ); }
V2.prototype.add = function( v ) { this.x += v.x; this.y += v.y; return this; }

V2.prototype.dif = function( v ) { return new V2( this.x-v.x, this.y-v.y ); }
V2.prototype.sub = function( v ) { this.x -= v.x; this.y -= v.y; return this; }

V2.prototype.prd = function( s ) { return new V2( this.x*s, this.y*s ); }
V2.prototype.mul = function( s ) { this.x *= s; this.y *= s; return this; }

V2.prototype.quo = function( s ) { return new V2( this.x/s, this.y/s ); }
V2.prototype.div = function( s ) { this.x /= s; this.y /= s; return this; }

V2.prototype.angle = function( v ) { return Math.atan2( v.y-this.y, v.x-this.x ); }
V2.prototype.dist = function( v ) { return Math.sqrt( Math.pow( v.x-this.x, 2 ) + Math.pow( v.y - this.y, 2)); }

V2.prototype.grid = function( w, h ) { this.x = Math.floor( this.x / w ); this.y = Math.floor( this.y / h ); 	}
V2.prototype.invert = function() { this.x *= -1; this.y *= -1;};



function Rect( p1, p2 ) {
	this.p1 = p1;
	this.p2 = p2;
}

Rect.create = function(x1,y1,x2,y2) {
	return new Rect( new V2( x1, y1 ), new V2( x2, y2 ));
}

Rect.prototype.collision = function( r ) {
	return this.p1.x < r.p2.x
			&& this.p2.x > r.p1.x
			&& this.p1.y < r.p2.y
			&& this.p2.y > r.p1.y;
}

Rect.prototype.combine = function( r ) {
	return new Rect(
		new V2( Math.min( this.p1.x, r.p1.x ), Math.min( this.p1.y, r.p1.y )),
		new V2( Math.max( this.p2.x, r.p2.x ), Math.max( this.p2.y, r.p2.y ))
	);
}

Rect.prototype.moved = function( v ) {
	return new Rect(
		this.p1.sum( v ),
		this.p2.sum( v )
	);
}

Rect.prototype.width = function() {
	return this.p2.x - this.p1.x;
}

Rect.prototype.height = function() {
	return this.p2.y - this.p1.y;
}

Rect.prototype.move = function( v ) {
	this.p1.add( v );
	this.p2.add( v );
}

Rect.prototype.grid = function( w, h ) {
	this.p1.grid( w, h );
	this.p2.grid( w, h );
}



function limit( v, m ) {
	return Math.min( m, Math.max( -m, v ));
}

function deg_to_vector( angle, length ) {
	return rad_to_vector( angle * ( Math.PI / 180 ), length );
}

function rad_to_vector( angle, length ) {
		var x = Math.round( Math.sin( angle ) * length );
		var y = -Math.round( Math.cos( angle ) * length );
		return new V2( x, y );
}

function rad_to_deg( rad ) {
		return rad * ( 180 / Math.PI );
}

function arrayRemove( arr, element ) {
	arr.splice( arr.indexOf( element ), 1 );
}
