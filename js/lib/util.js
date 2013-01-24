function framecounter( duration ) {
	this.duration = duration;
	this.anitime = 0;
	this.frame = 0;
}

framecounter.prototype.update = function( delta ) {
	this.anitime += delta;
	this.frame = Math.floor( this.anitime / this.duration );
}