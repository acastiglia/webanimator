
function AnimationController() {
  this.model = new Model();
  this.renderer = new Renderer();
}

AnimationController.prototype.start = function() {
  (function startAnimation(model, renderer) {
    (function step(timestamp) {
      model.advance(timestamp);
      renderer.render();
      window.requestAnimationFrame(step);
    })();
  })(this.model, this.renderer);
};

