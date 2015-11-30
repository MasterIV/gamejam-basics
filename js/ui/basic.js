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
	ctx.drawImage(this.img, 0, 0, this.size.w, this.size.h, this.position.x, this.position.y, this.size.w*this.scale, this.size.h*this.scale);
};

function RectEntity(pos, size, color) {
	Entity.call(this);
	this.position = pos;
	this.size = size;
	this.color = color;
}

RectEntity.prototype = new Entity();

RectEntity.prototype.onDraw = function(ctx) {
	this.color.apply(ctx, this.hover());
	ctx.fillRect(this.position.x, this.position.y, this.size.w, this.size.h);
	ctx.strokeRect(this.position.x, this.position.y, this.size.w, this.size.h);
};