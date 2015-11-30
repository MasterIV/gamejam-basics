function MenuScene() {
	Scene.call(this);

	this.entities.push(Button.create(new V2(100, 100), function() { game.scene = scenes.play; }).rect(200, 50).text("Play", colors.button));
	this.entities.push(Button.create(new V2(100, 200), function() { game.scene = scenes.play; }).rect(200, 50).text("Credits", colors.button));
	this.entities.push(Button.create(new V2(100, 300), function() { game.scene = scenes.play; }).rect(200, 50).text("Help", colors.button));
}

MenuScene.prototype = new Scene();