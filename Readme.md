# Gamejam Basics

Feature:

* Animationen
* Tield Maps
* Basic Input handling
	* Mouse
	* Keyboard
* More stuff

To-do liste:

* Collisions
* Anchoring

## Getting started

to be continued...

## Components

### Entites

### Scenes

### Tiled Maps

[Tiled](http://www.mapeditor.org/) is a very handy tool to create maps using Tile-Sets.

```JavaScript
// load the map file with the name map
var map = new TiledMap('map');

// renders all layers of the map and add them to the current entity / scene
this.add(map.render());

// render only specific layers of the map and add them
this.add(map.render(['bg', 'Below']));
```

### Viewport

The Viewport is a special container for scrollable content. Usually it should be attached directly into the scene.
You can use this for example for a Map that is larger than the screen. The Viewport could follow a player object 
or if it is an overview map you could enable map scrolling by dragging. When you want to script some camera movement
you can use the scrollTo method. I would strongly recommend to only use one of these methods at once.

```JavaScript
// Create new Viewport, the constructer tells you if hidden entities should also be updated
var viewport = new ViewPort(true);

// Add some entities to the Viewport, the Viewport will automatically adjust its size
viewport.add(new RectEntity(new V2(1000, 900), new V2(100, 100), colors.default));
viewport.add(player);
viewport.add(new RectEntity(new V2(0, 0), new V2(100, 100), colors.default));

// The Viewport would follow the player
viewport.follow(player);

// The Viewport could be moved by dragging
viewport.dragable(true);

// The Viewport will move to -200,-200 in a 3s animation and then enable dragging
viewport.scrollTo(new V2(-200,-200), 3000, function() {
	viewport.dragable(true);
});
```

