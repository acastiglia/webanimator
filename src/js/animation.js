
var AnimationController = (function() {
  var my = {};
  my.model = Model;
  my.renderer = Renderer;

  var step = function(timestamp) {
    model.advance(timestamp);
    renderer.render();
    window.requestAnimationFrame(step);
  };

  my.start = function() {
    step(Date.now());
  };

  return my;
})();


var Model = {
  advance: function(timestamp) {}
};

var Renderer = {
  render: function() {}
};

