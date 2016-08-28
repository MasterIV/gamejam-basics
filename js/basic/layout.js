define(['basic/entity'],
		function(Entity) {
			function Layout(pos, margin, spacing) {
				Entity.call(this, pos);
				this.margin = margin;
				this.spacing = spacing;
			}

			Layout.prototype = new Entity();

			Layout.prototype.adjustFixed = function(axis, entity) {
				entity.position[axis] = this.margin;
				if( this.size[axis] < entity.size[axis] + 2*this.margin )
					this.size[axis] = entity.size[axis] + 2*this.margin;
			};

			Layout.prototype.adjustFlexible = function(axis, entity) {
				var p = this.margin + this.entities.length * this.spacing;
				for(var i in this.entities ) p += this.entities[i].size[axis] || 0;
				entity.position[axis] = p;
				this.size[axis] = entity.position[axis] + entity.size[axis] + this.margin;
			};

			Layout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if(orientation == "center") {
						e.position.x = ( this.size.x - e.size.x ) / 2;
					} else if( orientation == "right") {
						e.position.x = this.size.x - e.size.x - this.margin;
					} else if( orientation == "middle") {
						e.position.y = ( this.size.y - e.size.y ) / 2;
					} else if( orientation == "bottom") {
						e.position.y = this.size.y - e.size.y - this.margin;
					}
				}
			};

			function VerticalLayout(pos, margin, spacing) {
				Layout.call(this ,pos, margin, spacing);
			}

			VerticalLayout.prototype = new Layout();

			VerticalLayout.prototype.add = function(e) {
				this.adjustFixed('x', e);
				this.adjustFlexible('y', e);
				Entity.prototype.add.call(this, e);
			};

			VerticalLayout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if(orientation == "center") {
						e.position.x = ( this.size.x - e.size.x ) / 2;
					} else if( orientation == "right") {
						e.position.x = this.size.x - e.size.x - this.margin;
					}
				}
			};

			function HorizontalLayout(pos, margin, spacing) {
				Layout.call(this, pos, margin, spacing);
			}

			HorizontalLayout.prototype = new Layout();

			HorizontalLayout.prototype.add = function(e) {
				this.adjustFixed('y', e);
				this.adjustFlexible('x', e);
				Entity.prototype.add.call(this, e);
			};

			HorizontalLayout.prototype.align = function(orientation) {
				for(var i in this.entities ) {
					var e = this.entities[i];

					if( orientation == "center") {
						e.position.y = ( this.size.y - e.size.y ) / 2;
					} else if( orientation == "bottom") {
						e.position.y = this.size.y - e.size.y - this.margin;
					}
				}
			};

			return {
				vertical: VerticalLayout,
				horizontal: HorizontalLayout
			};
		}
);
