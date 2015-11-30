function Button(pos, callback) {
	Entity.call(this);
	this.position = pos;
	this.onClick = callback;
}

Button.prototype = new Entity();

Button.create = function(pos, callback) {
	return new Button(pos, callback);
};

Button.prototype.text = function(text, colors, w, h) {

	return this;
};

Button.prototype.img = function(src, scale) {
	var img = new ImageEntity(Zero(), src, scale);
	this.size.x = Math.max(img.size.x, this.size.x);
	this.size.y = Math.max(img.size.y, this.size.y);
	this.entities.push(img);
	return this;
};

Button.prototype.rect = function(colors, w, h) {
	this.size.x = Math.max(w, this.size.x);
	this.size.y = Math.max(h, this.size.y);
	this.entities.push(new RectEntity(Zero, new V2(w,h), colors));
	return this;
};