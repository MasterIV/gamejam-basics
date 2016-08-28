define(['geo/v2'], function(V2) {
	return {
		between: function(min, max) {
			return function() {
				return Math.random() * (max-min) + min;
			};
		},

		vector: function(x, y) {
			return function() {
				return new V2(
						typeof x == 'function' ? x() : x,
						typeof y == 'function' ? y() : y
				);
			}
		}
	};
});