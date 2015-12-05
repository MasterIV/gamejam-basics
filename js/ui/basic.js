function ImageEntity(pos, src, scale) {
	this.img = graphics[src];
	Entity.call(this, pos, new V2(this.img.width, this.img.height));
	this.scale = scale || 1;
}

ImageEntity.prototype = new Entity();

ImageEntity.prototype.onDraw = function(ctx) {
	ctx.drawImage(this.img, 0, 0, this.size.x|0, this.size.y|0, 0, 0, (this.size.x*this.scale)|0, (this.size.y*this.scale)|0);
};

function RectEntity(pos, size, color) {
	Entity.call(this, pos, size);
	this.color = color || colors.default;
}

RectEntity.prototype = new Entity();

RectEntity.prototype.onDraw = function(ctx) {
	this.color.apply(ctx, this.hover());
	ctx.fillRect(0, 0, this.size.x|0, this.size.y|0);
	ctx.strokeRect(0, 0, this.size.x|0, this.size.y|0);
};

function TextEntity(pos, text, font) {
	Entity.call(this, pos);
	this.text = text;
	this.font = font || fonts.default;
}

TextEntity.prototype = new Entity();

TextEntity.prototype.onDraw = function(ctx) {
	this.font.apply(ctx, this.hover());
	ctx.fillText(this.text, 0, 0);
};

function PolyEntity(pos, vector_list, color) {
	this.color = color || colors.default;
	this.poly = Poly.create(vector_list);

	// Be careful that a rectangle of 0, 0, size.x, size.y does not surround the polygon!
	// See PolyEntity.clearOffset()
	Entity.call(this, pos, this.poly.getSize());
}

PolyEntity.prototype = new Entity();

PolyEntity.prototype.onDraw = function(ctx) {
	this.color.apply(ctx, this.hover());

	ctx.beginPath();

	var first = true;
	for ( var i = 0; i < this.poly.points.length; i++ ) {
		var point = this.poly.points[i];
		if (first) {
			ctx.moveTo(point.x, point.y);
			first = false;
		} else {
			ctx.lineTo(point.x, point.y);
		}
	}

	ctx.closePath();

	ctx.fill();
	ctx.stroke();

	if (config.debug) { // draws the surrounding rectangle of the polygon and the entity's position (red dot)
		var offset = this.poly.getOffset();
		ctx.strokeRect(offset.x, offset.y, this.size.x, this.size.y);
		ctx.fillStyle = '#ff0000';
		ctx.fillRect(-1,-1,3,3);
	}
};

PolyEntity.prototype.hover = function() {
	return this.poly.inside(new V2(mouse.x - this.position.x, mouse.y - this.position.y));
};

// Ensures that the entity's position is equal to the the polygon surrounding rectangle's upper left corner
// ### Will move the entity!
PolyEntity.prototype.clearOffset = function() {
	var offset = this.poly.getOffset();
	this.poly.move(offset.inverse());
	this.position.add(offset);
};