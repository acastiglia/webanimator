
function AnimationController() {
}

AnimationController.prototype.setModel = function(model) {
  this.model = model;
  return this;
};

AnimationController.prototype.setRenderer = function(renderer) {
  this.renderer = renderer;
  return this;
}; 

AnimationController.prototype.start = function() {
  (function startAnimation(model, renderer) {
    (function step(timestamp) {
      model.advance(timestamp);
      renderer.render();
      window.requestAnimationFrame(step);
    })(Date.now());
  })(this.model, this.renderer);
};

