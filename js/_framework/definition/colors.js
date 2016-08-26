define(function() {
	function Colors( stroke, fill, hoverStroke, hoverFill ) {
		this.stroke = stroke || 'black';
		this.fill = fill || 'white';
		this.hoverStroke = hoverStroke;
		this.hoverFill = hoverFill;
	}

	Colors.prototype.apply = function(ctx, hover) {
		ctx.strokeStyle = hover && this.hoverStroke ? this.hoverStroke : this.stroke;
		ctx.fillStyle = hover && this.hoverFill ? this.hoverFill : this.fill;
	};

	return Colors;
});