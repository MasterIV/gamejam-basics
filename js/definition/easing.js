define(function(){
	
	return {
		LINEAR: function (t) { return t },
		INQUAD: function (t) { return t*t },
		OUTQUAD: function (t) { return t*(2-t) },
		INOUTQUAD: function (t) { return t<.5 ? 2*t*t : -1+(4-2*t)*t },
		INCUBIC: function (t) { return t*t*t },
		OUTCUBIC: function (t) { return (--t)*t*t+1 },
		INOUTCUBIC: function (t) { return t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1 },
		INQUART: function (t) { return t*t*t*t },
		OUTQUART: function (t) { return 1-(--t)*t*t*t },
		INOUTQUART: function (t) { return t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t },
		INQUINT: function (t) { return t*t*t*t*t },
		OUTQUINT: function (t) { return 1+(--t)*t*t*t*t },
		INOUTQUINT: function (t) { return t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t },
		INELASTIC: function (t) {
			var b = 0; var c = 1; var d = 1;
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		OUTELASTIC: function (t) {
			var b = 0; var c = 1; var d = 1;
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		}
	}
	
});