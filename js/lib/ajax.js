var ajax = {
	load: function( url, callback ) {
		var xmlHttp = null

		try {
			xmlHttp = new XMLHttpRequest();
		} catch(e) {
			try {
				xmlHttp  = new ActiveXObject("Microsoft.XMLHTTP");
			} catch(e) {
				try {
					xmlHttp  = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xmlHttp  = null;
				}
			}
		}

		if(xmlHttp) {
			xmlHttp.open('GET', url, true);

			xmlHttp.onreadystatechange = function () {
					if (xmlHttp.readyState == 4) {
						callback(xmlHttp.responseText);
					}
			};

			xmlHttp.send(null);
		}
	},

	json: function( url, callback ) {
		this.load( url, function( data ) {
			callback( eval( '('+data+')' ));
		});
	}
}

