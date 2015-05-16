
function AnimationController() {
  this.model = new Model();
  this.renderer = new Renderer();
}

AnimationController.prototype.step = function(timestamp) {
  this.model.advance(timestamp);
  this.renderer.render();
  window.requestAnimationFrame(this.step);
};

AnimationController.prototype.start = function() {
  this.step(Date.now());
};

