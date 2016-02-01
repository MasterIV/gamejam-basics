define(['basic/entity', 'geo/v2', 'geo/rect', 'basic/morph'], function(Entity, V2, Rect, Morph) {
	function ViewPort(updateHidden) {
		Entity.call(this);
		this.updateHidden = updateHidden;
		this.subject = null;
		this.drag = false;
		this.dragging = null;
		this.dragStart = null;
	}

	ViewPort.prototype = new Entity();

	ViewPort.prototype.setParent = function(p) {
		this.parent = p;
		this.visible = p.size.clone();
	};

	ViewPort.prototype.getVisibleArea = function() {
		if(this.size.x == 0 && this.size.y == 0) this.inheritSize();
		var pos = this.position.inverse();
		return new Rect(pos, pos.sum(this.visible));
	};

	ViewPort.prototype.dispatch = function(list, event, argurment) {
		for (var i = 0; i < list.length; i++)
			if (list[i][event]) {

				if(event == 'draw' && this.getVisibleArea().collision(list[i].relativeArea()))
					list[i].draw(argurment);
				if(event == 'update' && (this.updateHidden || this.getVisibleArea().collision(list[i].relativeArea())))
					list[i].update(argurment);
				else
					list[i][event](argurment);
			}
	};

	ViewPort.prototype.follow = function(entity) {
		this.subject = entity;
	};

	ViewPort.prototype.scrollTo = function(pos, speed, callback) {
		this.add(new Morph({position: pos}, speed, null, callback));
	};

	ViewPort.prototype.dragable = function(status) {
		this.drag = status;
	};

	ViewPort.prototype.onMouseDown = function(pos) {
		if(this.drag) {
			this.dragging = pos;
			this.dragStart = this.position.clone();
		}
	};

	ViewPort.prototype.onMouseUp = function(pos) {
		if(this.drag) {
			this.dragging = null;
			this.dragStart = null;
		}
	};

	ViewPort.prototype.setPosition = function(x, y) {
		this.position.x = Math.max(Math.min(0, x), this.visible.x-this.size.x );
		this.position.y = Math.max(Math.min(0, y), this.visible.y-this.size.y );
	};

	ViewPort.prototype.click = function(pos) {
		var dif = this.dragStart ? this.dragStart.dif(this.position) : new V2(0,0);
		if (this.dragging == null || (Math.abs(dif.x) < 2 && Math.abs(dif.y) < 2))
			Entity.prototype.click.call(this, pos);
	};

	ViewPort.prototype.update = function(delta) {
		Entity.prototype.update.call(this, delta);

		if( this.subject ) {
			this.setPosition( this.visible.x/2-this.subject.position.x, this.visible.y/2-this.subject.position.y );
		} else if( this.dragging ) {
			var pos = this.parent.relativeMouse().dif(this.dragging);
			this.setPosition( pos.x, pos.y );
		}
	};

	ViewPort.prototype.centerSelf = function() {
		if(this.size.x == 0 && this.size.y == 0) this.inheritSize();
		this.position.x = ( this.parent.size.x - this.size.x ) / 2;
		this.position.y = ( this.parent.size.y - this.size.y ) / 2;
	};


	return ViewPort;
});

