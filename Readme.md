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

### Core

The core components contain some very basic stuff like input handling, graphics and sound.

#### Controls

This component handles keyboard input. By default it supports arrow keys/wasd and esc, space and enter key.
If you want to use custom keys you have to modify the key mapping. The controls component gets automatically
initialized in the main file. If you don't need keyboard input in your game, you can simply remove it from the
main file. Once initialized the controls component will automatically notify the current scene about
key-down and key up events.

The default key mapping looks like this:

```JavaScript
switch( code ) {
	case 116: return true; break; // F5
	case 32: this.emit( type, 'space' ); break;
	case 27: this.emit( type, 'esc' ); break;
	case 13: this.emit( type, 'enter' ); break;

	case 38: case 87: this.emit( type, 'up' ); break;
	case 40: case 83: this.emit( type, 'down' ); break;
	case 37: case 65: this.emit( type, 'left' ); break;
	case 39: case 68: this.emit( type, 'right' ); break;
}
```

To handle key input you can create the following methods on an entity:

```JavaScript
MyEntity.prototype.up = function (key) {
	if(key == 'space')
		this.stopFireWeapon();
};

MyEntity.prototype.down = function (key) {
	if(key == 'space')
		this.startFireWeapon();
};
```

Attention: The key events are not published to all entities inside a scene.
If you want to listen to key events in your entity you need to add it to the
keyAware array of the scene.

```JavaScript
this.keyAware.push(new MyEntity());
```

#### Graphics

The graphics component is used to load images.

### Basic Entities

#### Entites

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

