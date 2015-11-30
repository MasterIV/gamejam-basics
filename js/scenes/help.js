function HelpScene() {
	Scene.call(this);
	this.center(BackButton(scenes.menu));
}

HelpScene.prototype = new Scene();