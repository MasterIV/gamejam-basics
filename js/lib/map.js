var onTileMapLoaded;

define(['basic/entity', 'core/graphic', 'geo/v2'],
		function(Entity, graphics, V2) {
			function imagePath(url) {
				return url.substr(url.indexOf("img/"));
			}

			function preloadImages(data) {
				function loadImage(url) {
					if(graphics) graphics.add(imagePath(url));
					else queue.push(imagePath(url));
				}

				for( var i in data.tilesets )
					loadImage( data.tilesets[i].image );

				for( var i in data.layers )
					if( data.layers[i].image )
						loadImage( data.layers[i].image );
			}

			if(typeof(TileMaps) != "undefined")
				for(var i in TileMaps)
					preloadImages(TileMaps[i]);

			onTileMapLoaded = function(name, data) {
				preloadImages(data);
				TileMaps[name] = data;
			};

			function TiledSet(data) {
				this.img = graphics[imagePath(data.image)];
				this.start = data.firstgid;
				this.max = data.tilecount;

				var w = data.tilewidth;
				var h = data.tileheight;
				var l = data.imagewidth / data.tilewidth;

				this.draw = function(ctx, t, x, y) {
					ctx.drawImage(this.img, (t%l)*w, Math.floor(t/l)*h, w, h, x*w, y*h, w, h );
				};
			}

			function TiledPalette(data) {
				this.sets = [];

				for( var i in data )
					this.sets.unshift( new TiledSet(data[i]));
			}

			TiledPalette.prototype.draw = function(ctx, t, x, y) {
				if( t == 0 ) return;
				for( var i in this.sets ) {
					var s = this.sets[i];
					var r = t-s.start;
					if(r>0&&r< s.max)
						s.draw(ctx, r, x, y);
				}
			};

			function TiledLayer(canvas, pos) {
				Entity.call(this);
				this.position = pos || Zero();
				this.size = new V2(canvas.width, canvas.height);
				this.img = canvas;
				this.scale = 1;
			}

			TiledLayer.prototype = new Entity();

			TiledLayer.prototype.onDraw = function(ctx) {
				ctx.drawImage(this.img, 0, 0, this.size.x|0, this.size.y|0, 0, 0, (this.size.x*this.scale)|0, (this.size.y*this.scale)|0);
			};

			function TiledMap(name) {
				var data = TileMaps[name];
				var w = data.width * data.tilewidth;
				var h = data.height * data.tileheight;

				this.size = new V2(w,h);
				this.tile = new V2(data.tilewidth, data.tileheight);
				this.height = data.height;
				this.width = data.width;

				this.palette = new TiledPalette(data.tilesets);
				this.layers = data.layers;
			}

			TiledMap.prototype.render = function(filter, pos) {
				var canvas = document.createElement("canvas");
				canvas.width = this.size.x;
				canvas.height = this.size.y;

				var ctx = canvas.getContext("2d");
				for(var i in this.layers) {
					var l = this.layers[i];

					if(l.visible && (!filter || filter.indexOf(l.name) >= 0)) {
						ctx.save();
						ctx.globalAlpha = l.opacity;
						ctx.translate(l.x, l.y);

						if(l.type == "imagelayer")
							ctx.drawImage(graphics[imagePath(l.image)], 0, 0);
						else if(l.type == "tilelayer")
							for(var x = 0; x < l.width; x++)
								for(var y = 0; y < l.height; y++) {
									var t = l.data[x + (y * l.width)];
									this.palette.draw(ctx, t, x, y);
								}

						ctx.restore();
					}
				}

				return new TiledLayer(canvas, pos);
			};

			TiledMap.prototype.toTile = function(pos) {
				var result = pos.clone();
				result.grid(this.tile.x, this.tile.y);
				return result;
			};

			TiledMap.prototype.getLayer = function(name) {
				for(var i in this.layers) {
					var l = this.layers[i];
					if(l.name == name) return l;
				}
			};

			TiledMap.prototype.blocked = function(pos) {
				return this.has(pos, 'collision', true);
			};

			TiledMap.prototype.has = function(pos, property, def) {
				if( pos.x < 0 || pos.y < 0 || pos.x >= this.width || pos.y >= this.height )
					return def;

				var flags = this.flags(pos);
				return flags[property];
			};

			TiledMap.prototype.flags = function(pos) {
				if( pos.x < 0 || pos.y < 0 || pos.x >= this.width || pos.y >= this.height )
					return {};

				var result = {};
				for(var i in this.layers) {
					var l = this.layers[i];
					if(l.data && l.data[pos.x + (pos.y * l.width)])
						for(var p in l.properties)
							if(!result[p]) result[p] = l.properties[p];
				}

				return result;
			};

			// is this needed? i don't know
			TiledMap.prototype.tileAt = function(pos) {
				return null;
			};

			// TODO: add support for object layers
			return TiledMap;
		}
);



