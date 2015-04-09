
var model = new Model();

model.advance = function(timestamp) {
  this.x = 250 + 250 * Math.sin(0.001 * timestamp);
};

var renderer = new Renderer();
renderer.render = function() {
  document.getElementById('circ').setAttribute('cx', model.x);
};

var controller = new AnimationController();
controller.model = model;
controller.renderer = renderer;

function main() {
  controller.start();
}

