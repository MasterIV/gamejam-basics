define(['lib/scene', 'entity/back', 'basic/particles', 'geo/v2', 'definition/random', 'basic/layout', 'basic/button'],
		function(Scene, BackButton, Particles, V2, Radnom, Layout, Button) {
			function ParticleScene() {
				Scene.call(this);

				var p1 = new Particles(new V2(200, 200), {
					burst: [
						{time: 500, amount: 20},
						{time: 2000, amount: 30},
						{time: 4500, amount: 40}],
					interval: 5000,
					rate: 25,
					speed: Radnom.between(60,80),
					autoplay: false,
					loop: false
				});

				var p2 = new Particles(new V2(200, 400), {
					angle: 0,
					interval: 5000,
					rate: 150,
					speed: 70,
					lifetime: Radnom.between(1000,3000),
					offset: Radnom.vector(Radnom.between(-50, 50), 0),
					autoplay: false,
					loop: false
				});

				this.center(p1);
				this.center(p2);

				var layout = new Layout.horizontal(new V2(0, 500), 0, 40);
				layout.add(BackButton('menu'));
				layout.add(Button.create(new V2(0, 0), function() { p1.play() }).rect(80, 80).text("P1"));
				layout.add(Button.create(new V2(0, 0), function() { p2.play() }).rect(80, 80).text("P2"));
				this.center(layout);
			}

			ParticleScene.prototype = new Scene();

			return ParticleScene;
		}
);