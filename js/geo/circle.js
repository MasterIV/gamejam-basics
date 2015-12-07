define(['geo/v2'], function(V2) {
	function Circ(center, radius) {
		this.center = center;
		this.radius = radius;
	}

	Circ.prototype.collision = function(c) {
		var dist = this.center.dist(c.center);
		var rsum = this.radius + c.radius;
		return dist < rsum;
	};

	Circ.prototype.inside = function(v) {
		return v.dist(this.center) < this.radius;
	};

	return Circ;
});