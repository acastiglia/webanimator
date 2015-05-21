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

To run example animations, serve the root directory of this project with Python:
```sh
python -m SimpleHTTPServer
```
and navigate to http://localhost:8000, or simply open `index.html` in a 
web browser.


### Contributing

This is open source software, and contributions are welcome. If you'd like to extend the code in any way, please "fork and pull" (https://help.github.com/articles/using-pull-requests/).

