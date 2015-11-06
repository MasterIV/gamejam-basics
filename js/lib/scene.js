function Scene() {
	this.position = new V2(0, 0);
	this.size = new V2(0, 0);
	this.entities = [];

	var oldDraw = this.draw;
	this.draw = function(ctx ) {
		if( this.bg )
			this.bg.draw( ctx, 0 ,0 );
		oldDraw( ctx );
	};
}

Scene.prototype = new Entity();