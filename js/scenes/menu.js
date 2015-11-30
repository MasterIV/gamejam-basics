function MenuScene() {
	Scene.call(this);

	this.center(Button.create(new V2(0, 100), function() { game.scene = scenes.play; }).rect(300, 80).text("Play"));
	this.center(Button.create(new V2(0, 250), function() { game.scene = scenes.credits; }).rect(300, 80).text("Credits"));
	this.center(Button.create(new V2(0, 400), function() { game.scene = scenes.help; }).rect(300, 80).text("Help"));
}

MenuScene.prototype = new Scene();