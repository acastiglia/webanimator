# webanimator
Utilities for creating animations in the browser.

### Usage
This project provides a lightweight animation framework for the browser.

#### Create an Animation

An animation consists of a Model and a Renderer, and is controlled by an
AnimationController. The Model object defines the world, the objects in it, 
and the way in which the objects move and interact with each other. The 
Renderer object specifies how the world is drawn on the page.

### Requirements
  * node
  * npm
  * bower

### Build
Install dev dependencies:
```sh
npm install
bower install
```

Build with gulp:
```sh
gulp
```
