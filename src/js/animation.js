
var AnimationController = function() {
  this.model = Model;
  this.renderer = Renderer;

  var step = function(timestamp) {
    model.advance(timestamp);
    renderer.render();
    window.requestAnimationFrame(step);
  };

  this.start = function() {
    step(Date.now());
  };
};


var Model = function() {
  this.advance = function(timestamp) {};
};

var Renderer = function() {
  this.render = function() {};
};
