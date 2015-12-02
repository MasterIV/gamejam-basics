function Entity() {
	this.position = new V2(0, 0);
	this.size = new V2(0, 0);
	this.entities = [];
	this.hidden = [];
	this.blocking = [];
}

Entity.prototype.setSize = function(w, h) {
	this.size.x = w;
	this.size.y = h;
};

Entity.prototype.inheritSize = function() {
	var origin = new V2(0, 0);
	var end = new V2(0, 0);
	for (var i = 0; i < this.entities.length; i++) {
		var entity = this.entities[i];

		origin.x = Math.min(entity.position.x, origin.x);
		origin.y = Math.min(entity.position.y, origin.y);
		end.x = Math.max(entity.getArea().p2.x, end.x);
		end.y = Math.max(entity.getArea().p2.y, end.y);
	}
	this.size = end.sub(origin);
};

Entity.prototype.setPosition = function(x, y) {
	this.position.x = x;
	this.position.y = y;
};

Entity.prototype.dispatch = function(list, event, argurment) {
	for (var i = 0; i < list.length; i++)
		if (list[i][event])
			list[i][event](argurment);
};

Entity.prototype.update = function(delta) {
	if (this.onUpdate)
		this.onUpdate(delta);

	if( this.blocking.length ) {
		this.dispatch(this.blocking, 'update', delta );
	} else {
		this.dispatch(this.entities, 'update', delta );
	}
};

Entity.prototype.getArea = function() {
	if(this.size.x == 0 && this.size.y == 0) this.inheritSize();
	return new Rect(this.position, this.position.sum(this.size));
};

Entity.prototype.hideEntities = function() {
	if (!this.entities.length) return;
	this.hidden = this.entities;
	this.entities = [];
};

Entity.prototype.showEntities = function() {
	if (!this.hidden.length) return;
	this.entities = this.hidden;
	this.hidden = [];
};

Entity.prototype.hover = function() {
	return this.getArea().inside(mouse);
};

Entity.prototype.draw = function(ctx) {
	ctx.save();
	ctx.translate(this.position.x, this.position.y);

	if (this.onDraw) this.onDraw(ctx);
	this.dispatch(this.entities, 'draw', ctx );
	this.dispatch(this.blocking, 'draw', ctx );

	ctx.restore();
};

Entity.prototype.click = function(pos) {
	if (!this.getArea().inside(pos)) return;
	pos = pos.dif(this.position);
	if (this.onClick) this.onClick(pos);

	if( this.blocking.length ) {
		this.dispatch(this.blocking, 'click', pos );
	} else {
		this.dispatch(this.entities, 'click', pos );
	}
};

Entity.prototype.mousedown = function(pos) {
	if (!this.getArea().inside(pos)) return;
	pos = pos.dif(this.position);
	if (this.onMouseDown) this.onMouseDown(pos);

	if( this.blocking.length ) {
		this.dispatch(this.blocking, 'mousedown', pos );
	} else {
		this.dispatch(this.entities, 'mousedown', pos );
	}
};

Entity.prototype.mouseup = function(pos) {
	if (!this.getArea().inside(pos)) return;
	pos = pos.dif(this.position);
	if (this.onMouseUp) this.onMouseUp(pos);

	if( this.blocking.length ) {
		this.dispatch(this.blocking, 'mouseup', pos );
	} else {
		this.dispatch(this.entities, 'mouseup', pos );
	}
};