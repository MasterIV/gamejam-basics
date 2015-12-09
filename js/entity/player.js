define(['basic/entity', 'geo/v2', 'config/colors', 'basic/rect', 'core/graphic', 'lib/animation'],
	function(Entity, V2, colors, RectEntity, graphics, Animation) {
		graphics.add('img/death.png');

		function Player(pos) {
			Entity.call(this);
			this.position = pos;
			this.add(new RectEntity(Zero(), new V2(40, 80), colors.player));
			this.velocity = new V2(0,0);
			this.speed = 100;
		}

		Player.prototype = new Entity();

		Player.prototype.onUpdate = function(delta) {
			this.position.add(this.velocity.prd(delta/1000));
		};

		Player.prototype.down = function(key) {
			switch(key) {
				case 'up': this.velocity.y = -this.speed; break;
				case 'down': this.velocity.y = this.speed; break;
				case 'left': this.velocity.x = -this.speed; break;
				case 'right': this.velocity.x = this.speed; break;
				case 'space': this.parent.add(new Animation('img/death.png', this.position.clone(), 7, 100)); break;
			}
		};

		Player.prototype.up = function(key) {
			switch(key) {
				case 'up':  case 'down': this.velocity.y = 0; break;
				case 'left':  case 'right': this.velocity.x = 0; break;
			}
		};

		return Player;
	}
);