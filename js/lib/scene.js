function scene() {
	this.entities = [];
};

scene.prototype.update = function( delta ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].update )
			this.entities[i].update( delta );
}

scene.prototype.draw = function( ctx ) {
	if( this.bg )
		this.bg.draw( ctx, 0 ,0 );

	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].draw )
			this.entities[i].draw( ctx );
}

scene.prototype.click = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].click )
			this.entities[i].click( pos );
}

scene.prototype.mousedown = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].mousedown )
			this.entities[i].mousedown( pos );
}

scene.prototype.mouseup = function( pos ) {
	for( var i = 0; i < this.entities.length; i++ )
		if( this.entities[i].mouseup )
			this.entities[i].mouseup( pos );
}