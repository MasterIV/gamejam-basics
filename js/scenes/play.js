function PlayScene() {
	Scene.call(this);

	var player = new Player(new V2(500,500));
	var map = new TiledMap(maps.map);
	var viewport = new ViewPort(true);
	viewport.add(map.render(['bg', 'Below']));
	viewport.add(player);
	viewport.add(map.render(['More']));
	viewport.add(new RectEntity(new V2(900,700), new V2(100,100), colors.default));
	viewport.follow(player);

	this.add(viewport);
	this.keyAware.push(player);
}

PlayScene.prototype = new Scene();