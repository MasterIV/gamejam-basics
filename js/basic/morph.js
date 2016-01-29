define(['definition/easing'],
		function(Easing) {
			function Morph(finalAttributes, duration, easingFunction, callback) {
				this.attributes = finalAttributes;
				this.duration = (duration == null) ? 300 : duration;
				this.easingFunction = easingFunction || Easing.LINEAR;

				this.callback = callback;
				this.animationTime = 0;
			}

			Morph.prototype.initMorphAttributes = function(finalAttributes, target) {
				for(var key in finalAttributes)
					if(finalAttributes.hasOwnProperty(key)) {
						var value = finalAttributes[key];
						if("object" == typeof(value)) {
							this.initMorphAttributes(value, target[key]);
						} else if("function" != typeof(value)) {
							finalAttributes[key] = new MorphData(target[key], value);
						}
					}
			};

			Morph.prototype.update = function (delta) {
				this.animationTime += delta;
				this.performMorph(this.attributes, this.parent);
				if(this.animationTime >= this.duration) {
					this.parent.remove(this);
					if(this.callback) this.callback(this.parent);
				}
			};

			Morph.prototype.performMorph = function(attributes, target) {
				var progress = this.getProgress();
				for(var key in attributes) {
					if(!(attributes[key] instanceof MorphData)) {
						this.performMorph(attributes[key], target[key]);
					} else {
						target[key] = attributes[key].valueForProgress(progress);
					}
				}
			};
			
			Morph.prototype.getProgress = function(delta) {
				var progress = this.animationTime / this.duration;
				progress = Math.min(Math.max(progress, 0), 1);
				return this.easingFunction(progress);
			};
			
			Morph.prototype.setParent = function(parent){
				this.parent = parent;
				this.initMorphAttributes(this.attributes, this.parent);
			};
			
			// Internal Helper			
			function MorphData(from, to){
				this.from = from;
				this.to = to;
			}
			
			MorphData.prototype.valueForProgress = function(progress) {
				return this.from + (this.to - this.from) * progress;
			};
			
			return Morph;
		}
);