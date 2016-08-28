define(['lib/scene', 'entity/back', 'basic/particles', 'geo/v2', 'definition/random', 'basic/layout', 'basic/button', 'core/graphic'],
		function(Scene, BackButton, Particles, V2, Radnom, Layout, Button, graphic) {
			graphic.add('img/particles/ParticleFlare.png');
			graphic.add('img/particles/ParticleCloudBlack.png');
			graphic.add('img/particles/ParticleCloudWhite.png');
			graphic.add('img/particles/BloodStainsSmall.png');

			function ParticleScene() {
				Scene.call(this);

				var p1 = new Particles(new V2(200, 200), {
					burst: [
						{time: 500, amount: 20},
						{time: 2000, amount: 30},
						{time: 4500, amount: 40}],
					interval: 5000,
					rate: 25,
					scale: 6,
					speed: Radnom.between(60,80),
					autoplay: false,
					loop: false
				});

				var p2 = new Particles(new V2(200, 400), {
					angle: 0,
					interval: 5000,
					rate: 50,
					speed: 400,
					lifetime: Radnom.between(1000,2000),
					offset: Radnom.vector(Radnom.between(-100, 100), 0),
					autoplay: false,
					loop: false,
					sprite: graphic['img/particles/ParticleCloudBlack.png']
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