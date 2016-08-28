define(['basic/entity', 'geo/v2', 'definition/random'],
		function(Entity, V2, Random) {
			function Particles(pos, config) {
				Entity.call(this, pos);

				this.config = {
					// Particle Settings
					angle: Random.between(0, 360),
					speed: 50,
					lifetime: 2000,
					scale: 1,
					offset: Zero(),

					// Emission Settings
					autoplay: true,
					interval: 1000,
					loop: true,
					rate: 20,
					burst: []
				};

				for(var i in config)
					if(this.config[i] )
						this.config[i] = config[i];

				this.last = 0;
				this.timer = this.config.autoplay ? 0 : this.config.interval;
				this.rate = this.config.interval / this.config.rate;
			}

			Particles.prototype = new Entity();

			// do not bother to dispatch mouse events
			Particles.prototype.click = function(pos) {};
			Particles.prototype.mousedown = function(pos) {};
			Particles.prototype.mouseup = function(pos) {};

			Particles.prototype.onUpdate = function(delta) {
				this.timer += delta;

				if( this.timer < this.config.interval) {
					for(var i = 0; i < this.config.burst.length; i++)
						if(this.config.burst[i].time < this.timer && this.config.burst[i].time >= this.timer-delta )
							for(var j = 0; j < this.config.burst[i].amount; j++)
								this.spawn();

					while(this.last+this.rate < this.timer) {
						this.spawn();
						this.last += this.rate;
					}
				} else if(this.config.loop) {
					this.play();
				}
			};

			Particles.prototype.spawn = function() {
				this.add(new Particle(eor(this.config.offset).clone(), this.config));
			};

			Particles.prototype.play = function() {
				this.last = 0;
				this.timer = 0;
			};

			/* ======= Here comes the particle ======= */

			function Particle(pos, config) {
				Entity.call(this, pos);
				this.config = config;
				this.timer = 0;

				this.lifetime = eor( config.lifetime );
				this.velocity = V2.fromDeg( eor(config.angle), eor(config.speed));
			}

			Particle.prototype = new Entity();

			Particle.prototype.update = function(delta) {
				this.timer += delta;

				if(this.timer > this.lifetime ) {
					this.parent.remove(this)
					return;
				}

				this.position.add(this.velocity.prd(delta / 1000));
			};

			Particle.prototype.draw = function(ctx) {
				ctx.fillStyle = 'red';
				ctx.fillRect(this.position.x, this.position.y, 5, 5);
			};

			return Particles;
		}
);