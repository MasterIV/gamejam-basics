define(['geo/v2', 'geo/rect', 'core/mouse'], function(V2, Rect, mouse) {
	function Entity(pos, size) {
		this.position = pos || Zero();
		this.size = size || Zero();
		this.entities = [];
		this.blocking = [];
		this.parent = null;
		this.visible = true;
	}

	Entity.prototype.setSize = function (w, h) {
		this.size.x = w;
		this.size.y = h;
	};

	Entity.prototype.inheritSize = function () {
		var origin = new V2(0, 0);
		var end = new V2(0, 0);

		for (var i = 0; i < this.entities.length; i++)
			if(this.entities[i].size) {
				var entity = this.entities[i];
				var p2 = entity.position.sum(entity.size);

				origin.x = Math.min(entity.position.x, origin.x);
				origin.y = Math.min(entity.position.y, origin.y);
				end.x = Math.max(p2.x, end.x);
				end.y = Math.max(p2.y, end.y);
			}

		this.size = end.sub(origin);
	};

	Entity.prototype.setPosition = function (x, y) {
		this.position.x = x;
		this.position.y = y;
	};

	Entity.prototype.setParent = function (p) {
		this.parent = p;
	};

	Entity.prototype.add = function (entity) {
		entity.setParent(this);
		this.entities.push(entity);
	};

	Entity.prototype.relativeMouse = function () {
		if (this.parent)
			return this.parent.relativeMouse().dif(this.position);
		else
			return mouse.dif(this.position);
	};

	Entity.prototype.block = function (entity) {
		this.blocking.push(entity);
	};

	Entity.prototype.remove = function (entity) {
		if( this.entities.indexOf(entity) > -1 ) arrayRemove(this.entities, entity);
		if( this.blocking.indexOf(entity) > -1 ) arrayRemove(this.blocking, entity);
	};

	Entity.prototype.dispatch = function (list, event, argurment) {
		for (var i = 0; i < list.length; i++)
			if (list[i][event])
				list[i][event](argurment);
	};

	Entity.prototype.dispatchReverse = function (list, event, argurment) {
		for (var i = list.length-1; i >= 0; i--)
			if (list[i][event])
				if( list[i][event](argurment)) return true;
	};

	Entity.prototype.update = function (delta) {
		if (this.onUpdate)
			this.onUpdate(delta);

		if (this.blocking.length) {
			this.dispatch(this.blocking, 'update', delta);
		} else {
			this.dispatch(this.entities, 'update', delta);
		}
	};

	Entity.prototype.getArea = function () {
		if (this.size.x == 0 && this.size.y == 0) this.inheritSize();
		return new Rect(Zero(), this.size);
	};

	Entity.prototype.relativeArea = function () {
		return this.getArea().moved(this.position);
	};

	Entity.prototype.hover = function () {
		return this.getArea().inside(this.relativeMouse());
	};

	Entity.prototype.draw = function (ctx) {
		if(!this.visible) return;
		ctx.save();
		ctx.translate(this.position.x | 0, this.position.y | 0);

		if (this.onDraw) this.onDraw(ctx);
		this.dispatch(this.entities, 'draw', ctx);
		this.dispatch(this.blocking, 'draw', ctx);
		if (this.postDraw) this.postDraw(ctx);

		ctx.restore();
	};

	Entity.prototype.click = function (pos) {
		pos = pos.dif(this.position);
		if (!this.getArea().inside(pos)) return;
		if (this.onClick && this.onClick(pos)) return true;

		if (this.blocking.length) {
			return this.dispatchReverse(this.blocking, 'click', pos);
		} else {
			return this.dispatchReverse(this.entities, 'click', pos);
		}
	};

	Entity.prototype.mousedown = function (pos) {
		pos = pos.dif(this.position);
		if (!this.getArea().inside(pos)) return;
		if (this.onMouseDown && this.onMouseDown(pos)) return true;

		if (this.blocking.length) {
			return this.dispatchReverse(this.blocking, 'mousedown', pos);
		} else {
			return this.dispatchReverse(this.entities, 'mousedown', pos);
		}
	};

	Entity.prototype.mouseup = function (pos) {
		pos = pos.dif(this.position);
		if (!this.getArea().inside(pos)) return;
		if (this.onMouseUp && this.onMouseUp(pos)) return true;

		if (this.blocking.length) {
			return this.dispatchReverse(this.blocking, 'mouseup', pos);
		} else {
			return this.dispatchReverse(this.entities, 'mouseup', pos);
		}
	};

	Entity.prototype.center = function (obj) {
		obj.position.x = this.size.x / 2 - obj.size.x / 2;
		this.add(obj);
	};

	return Entity;
});
