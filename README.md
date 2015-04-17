# webanimator
Utilities for creating animations in the browser.

### Usage
This project provides a lightweight animation framework for the browser.

#### Create an Animation

An animation consists of a Model and a Renderer, and is controlled by an
AnimationController. The Model object defines the world, the objects in it, 
and the way in which the objects move and interact with each other. The 
Renderer object specifies how the world is drawn on the page.

##### Example: A pulsing SVG circle

```js
var model = new Model();
model.radius = 100;
model.advance = function(timestamp) {
  this.radius = 100 * Math.sin(0.001 * timestamp);
};

var renderer = new Renderer();
renderer.render = 

```

### Requirements
  * node
  * npm

### Build
Install dependencies:
```sh
npm install
```

Build with gulp:
```sh
gulp
```
