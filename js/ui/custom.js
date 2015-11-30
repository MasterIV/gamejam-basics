graphics.add('img/back.png');

function BackButton(scene) {
	return Button.create(new V2(0, 500), function() { game.scene = scene }).img('img/back.png');
}