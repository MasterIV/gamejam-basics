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

### Entity

### Viewport

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

