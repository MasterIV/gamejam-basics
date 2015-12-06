define(['geo/v2'], function(V2) {
	function Rect( p1, p2 ) {
		this.p1 = p1;
		this.p2 = p2;
	}

	Rect.create = function(x1,y1,x2,y2) {
		return new Rect( new V2( x1, y1 ), new V2( x2, y2 ));
	};

	Rect.prototype.collision = function( r ) {
		return this.p1.x < r.p2.x
		&& this.p2.x > r.p1.x
		&& this.p1.y < r.p2.y
		&& this.p2.y > r.p1.y;
	};

	Rect.prototype.combine = function( r ) {
		return new Rect(
				new V2( Math.min( this.p1.x, r.p1.x ), Math.min( this.p1.y, r.p1.y )),
				new V2( Math.max( this.p2.x, r.p2.x ), Math.max( this.p2.y, r.p2.y ))
		);
	};

	Rect.prototype.moved = function( v ) {
		return new Rect(
				this.p1.sum( v ),
				this.p2.sum( v )
		);
	};

	Rect.prototype.width = function() {
		return this.p2.x - this.p1.x;
	};

	Rect.prototype.height = function() {
		return this.p2.y - this.p1.y;
	};

	Rect.prototype.move = function( v ) {
		this.p1.add( v );
		this.p2.add( v );
	};

	Rect.prototype.grid = function( w, h ) {
		this.p1.grid( w, h );
		this.p2.grid( w, h );
	};

	Rect.prototype.inside = function( v ) {
		return this.p1.x < v.x
		&& this.p2.x > v.x
		&& this.p1.y < v.y
		&& this.p2.y > v.y;
	};

	return Rect;
});