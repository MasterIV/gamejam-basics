function PlayScene() {
	Scene.call(this);

	var player = new Player(new V2(500,500));
	var viewport = new ViewPort(true);
	viewport.add(player);
	viewport.add(new RectEntity(new V2(0,0), new V2(100,100), colors.default));
	viewport.add(new RectEntity(new V2(900,700), new V2(100,100), colors.default));
	viewport.follow(player);

	this.add(viewport);
	this.keyAware.push(player);
}

PlayScene.prototype = new Scene();