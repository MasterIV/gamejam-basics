function limit( v, m ) {
	return Math.min( m, Math.max( -m, v ));
}

function deg_to_vector( angle, length ) {
	return rad_to_vector( angle * ( Math.PI / 180 ), length );
}

function rad_to_vector( angle, length ) {
	var x = Math.round( Math.sin( angle ) * length );
	var y = -Math.round( Math.cos( angle ) * length );
	return new V2( x, y );
}

function rad_to_deg( rad ) {
	return rad * ( 180 / Math.PI );
}

function arrayRemove( arr, element ) {
	arr.splice( arr.indexOf( element ), 1 );
}
