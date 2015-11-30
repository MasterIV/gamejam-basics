function Scene() {
	Entity.call(this);
	this.size.x = screen.w;
	this.size.y = screen.h;
}

Scene.prototype = new Entity();

Scene.prototype.onDraw = function(ctx) {
	if( this.bg )
		this.bg.draw( ctx, 0 ,0 );
};