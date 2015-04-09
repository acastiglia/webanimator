
var model = new Model();

model.advance = function(timestamp) {
  this.x = 250 + 250 * Math.sin(0.001 * timestamp);
  this.y = 250 + 250 * Math.cos(0.003 * timestamp);
};

var renderer = new Renderer();
renderer.render = function() {
  document.getElementById('circ').setAttribute('cx', model.x);
  document.getElementById('circ').setAttribute('cy', model.y);
};

var controller = new AnimationController();
controller.model = model;
controller.renderer = renderer;

function main() {
  controller.start();
}

