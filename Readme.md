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
* Particles

## Getting started

When you check out the project you can already open the index.html and you will find a very basic example. 
The example includes four [scenes](https://github.com/MasterIV/gamejam-basics/tree/master/js/scenes): 
menu, credits, help and play.
The first three of them are basically only UI, in the play scene you have some examples how components
could be used.

But let's start with the basics. You might ask your self: what is a scene?
All elements in a game usually have to cycles which are called every frame.
First the update cycle, which usually contains all calculations and draw
cycle which displays our element. We call this kind of game elements Entities.
An Entity could be everything: the player, the map, some obstacles, flying bullets or enemies.
Entities are usually organized in some sort of tree like structure, we call the scene graph.
A scene is now a special sort of Entity, it is the root node of our tree structure.
Only if the scene is active all child entities of it get drawn and update.

> to be continued...

## Components

### Core

The core components contain some very basic stuff like input handling, graphics and sound.
If you don't need them or don't want to use them you can disable the initialization in the main.js

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
Add all images when your module is initialized, not when the entities are created.
All added images will be loaded before the game starts and are then available during game runtime.

```JavaScript
// Add image to be loaded on game start
graphic.add("myimage.png");

// use the image inside the game
ctx.drawImage(graphic["myimage.png"], 0 ,0);
```

#### Sound

Like with the graphics it is possible to preload sound. But for sound it is not required.
You may play sound files that you haven't preloaded. This will load the clips on demand
which might result in a short playback delay. As soon as you played a sound once it loaded
and no delays should appear in future playbacks. The preloading of sound happens asynchronous.
It will not delay the start of the game.

```JavaScript
// Add sound to be loaded on game start
sounds.add("mysound.mp3");

// play a sound
sounds.play("mysound.mp3");
```

> TODO: Format support

#### Mouse

Once initialized the mouse is a V2 representing the position of the mouse. 
When creating an Entity you could define multiple callbacks to react on mouse events:

```JavaScript
function MyEntity() {
	Entity.call(this);
}

MyEntity.prototype = new Entity();

// these events are emitted independend from the game loop, so be careful
MyEntity.prototype.onClick = function(pos) { "... some code here ..."; }
MyEntity.prototype.onMouseDown = function(pos) { "... some code here ..."; }
MyEntity.prototype.onMouseUp = function(pos) { "... some code here ..."; }

// to create a hove effect you need to check in the draw method if the mouse intersects with your entity
MyEntity.prototype.onDraw = function(ctx) {
	var hover = this.hover();
}
```

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

