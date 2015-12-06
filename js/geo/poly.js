define(['geo/v2', 'geo/rect'], function(V2, Rect) {
	function Poly( vector_list ) {
		if ( config.debug && vector_list.length < 3 )
			console.log("Warning: Creating polygon with less than three vertices!");

		this.points = vector_list;
		this.calcSize();
	}

	Poly.create = function( vector_list ) {
		return new Poly( vector_list );
	};

// Get a surrounding rectangle for rough checks
	Poly.prototype.calcSize = function() {
		var origin = new V2(this.points[0].x, this.points[0].y);
		var end = new V2(this.points[0].x, this.points[0].y);
		for (var i = 0; i < this.points.length; i++) {
			var point = this.points[i];

			origin.x = Math.min(point.x, origin.x);
			origin.y = Math.min(point.y, origin.y);
			end.x = Math.max(point.x+1, end.x);
			end.y = Math.max(point.y+1, end.y);
		}
		this.sizeRect = new Rect(origin, end);
	};

// Returns the offset relative to 0,0
	Poly.prototype.getOffset = function() {
		return new V2( this.sizeRect.p1.x, this.sizeRect.p1.y );
	};

// Return width / height of surrounding rectangle
	Poly.prototype.getSize = function() {
		return new V2( this.sizeRect.p2.x - this.sizeRect.p1.x, this.sizeRect.p2.y - this.sizeRect.p1.y );
	};

	Poly.prototype.move = function( v ) {
		for (var i = 0; i < this.points.length; i++) {
			this.points[i].add(v);
		}
		this.calcSize();
	};

	// Returns true if given vector is inside the polygon, false otherwise.
	// Point on line is treated as inside.
	Poly.prototype.inside = function( v ) {
		if (!this.sizeRect.inside(v)) return false;

		// even-odd rule

		var t = -1;
		var tpoints = [ new V2(this.points[this.points.length-1].x, this.points[this.points.length-1].y) ];
		tpoints = tpoints.concat(this.points);
		for (var i = 0; i < tpoints.length - 1; i++) {
			t *= intersect( v, tpoints[i], tpoints[i+1] );
		}
		return t >= 0;
	};

	return Poly;
});