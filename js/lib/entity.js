function Entity() {
	this.position = new V2(0, 0);
	this.size = new V2(0, 0);
	this.entities = [];
}

Entity.prototype.setSize = function( w, h ) {
	this.size.x = w;
	this.size.y = h;
};

Entity.prototype.setPosition = function( x, y ) {
	this.position.x = x;
	this.position.y = y;
};

Entity.prototype.update = function (delta) {
	for (var i = 0; i < this.entities.length; i++)
		if (this.entities[i].update)
			this.entities[i].update(delta);
};

Entity.prototype.getArea = function() {
	return new Rect( this.position, this.position.sum(this.size));
};

Entity.prototype.draw = function (ctx) {
	ctx.save();
	ctx.translate(this.position.x, this.position.y);
	for (var i = 0; i < this.entities.length; i++)
		if (this.entities[i].draw)
			this.entities[i].draw(ctx);
	ctx.restore();
};

Entity.prototype.click = function (pos) {
	if( !this.getArea().inside(pos)) return;
	pos.sub(this.position);

	for (var i = 0; i < this.entities.length; i++)
		if (this.entities[i].click)
			this.entities[i].click(pos);
};

Entity.prototype.mousedown = function (pos) {
	if( !this.getArea().inside(pos)) return;
	pos.sub(this.position);

	for (var i = 0; i < this.entities.length; i++)
		if (this.entities[i].mousedown)
			this.entities[i].mousedown(pos);
};

Entity.prototype.mouseup = function (pos) {
	if( !this.getArea().inside(pos)) return;
	pos.sub(this.position);

	for (var i = 0; i < this.entities.length; i++)
		if (this.entities[i].mouseup)
			this.entities[i].mouseup(pos);
};