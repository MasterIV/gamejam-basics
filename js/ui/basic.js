function ImageEntity(pos, src, scale) {
	Entity.call(this);
	this.position = pos;
	this.img = graphics[src];
	this.size.x = this.img.width;
	this.size.y = this.img.height;
	this.scale = scale || 1;
}

ImageEntity.prototype = new Entity();

ImageEntity.prototype.onDraw = function(ctx) {
	ctx.drawImage(this.img, 0, 0, this.size.x|0, this.size.y|0, 0, 0, (this.size.x*this.scale)|0, (this.size.y*this.scale)|0);
};

function RectEntity(pos, size, color) {
	Entity.call(this);
	this.position = pos;
	this.size = size;
	this.color = color || colors.default;
}

RectEntity.prototype = new Entity();

RectEntity.prototype.onDraw = function(ctx) {
	this.color.apply(ctx, this.hover());
	ctx.fillRect(0, 0, this.size.x|0, this.size.y|0);
	ctx.strokeRect(0, 0, this.size.x|0, this.size.y|0);
};

function TextEntity(pos, text, font) {
	Entity.call(this);
	this.position = pos;
	this.text = text;
	this.font = font || fonts.default;
}

TextEntity.prototype = new Entity();

TextEntity.prototype.onDraw = function(ctx) {
	this.font.apply(ctx, this.hover());
	ctx.fillText(this.text, 0, 0);
};
