function Framecounter(duration ) {
	this.duration = duration;
	this.anitime = 0;
	this.frame = 0;
}

Framecounter.prototype.update = function(delta ) {
	this.anitime += delta;
	this.frame = Math.floor( this.anitime / this.duration );
};