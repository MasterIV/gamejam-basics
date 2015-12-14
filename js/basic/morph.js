define(['definition/easing'],
		function(Easing) {
			function Morph(obj, finalAttributes, duration, easingFunction) {
				this.obj = obj;
				this.attributes = finalAttributes;
				this.duration = duration;
				this.easingFunction = easingFunction || Easing.LINEAR;
				
				this.callback = function(){};
				this.then = null;
				this.animationTime = 0;
				this.progress = 0;
			}

			Morph.prototype.update = function (delta) {
				if(this.animationTime == 0) {
					this.attributes = this.initAttributes(this.attributes, this.obj);
				}
				this.updateProgress(delta);
				this.obj = this.updateAttributes(this.attributes, this.obj);
				if(this.animationTime >= this.duration) {
					this.callback();
					if(this.then) this.parent.add(this.then);
					this.reset();
				}
			}
			
			Morph.prototype.updateProgress = function(delta) {
				this.animationTime += delta;
				this.progress = this.animationTime / this.duration;
				this.progress = Math.min(Math.max(this.progress, 0), 1);
				this.progress = this.easingFunction(this.progress);
			}
			
			Morph.prototype.reset = function() {
				this.parent.remove(this);
				this.animationTime = 0;
				this.progress = 0;
			}
			
			Morph.prototype.updateAttributes = function(attr, obj) {
				for(var key in attr) {
					if(attr[key].constructor != MorphData) {
						obj[key] = this.updateAttributes(attr[key], obj[key]);
					} else {
						var value = attr[key].from;
						var diff = attr[key].to - attr[key].from;
						value += diff * this.progress;
						obj[key] = value;
					}
				}
				return obj;
			}
			
			Morph.prototype.initAttributes = function(attr, obj) {
				for(var key in attr) {
					if(attr[key].constructor == MorphData) {
						attr[key] = new MorphData(obj[key], attr[key].to);
					} else if("object" == typeof(attr[key])) {
						attr[key] = this.initAttributes(attr[key], obj[key]);
					} else {
						attr[key] = new MorphData(obj[key], attr[key]);
					}
				}
				return attr;
			}
			
			Morph.prototype.setParent = function(parent){
				this.parent = parent;
			}
			
			function MorphData(from, to){
				this.from = from;
				this.to = to;
			}
			
			return Morph;
		}
);