
var THRESHOLD_DISTANCE = 1e-5;
var G = 100;

var renderer = null;

window.onload = function() {
  var pointerX = 0;
  var pointerY = 0;

  var scaleX = window.innerWidth;
  var scaleY = window.innerHeight;

  var t = null;

  renderer = SvgRenderer.fromGraphic(document.getElementById("graphic")
      .contentDocument
      .getElementById("graphic"));

  renderer.rootElement.element.addEventListener('mousemove', function(e) {
    pointerX = e.clientX;
    pointerY = e.clientY;
  }, false);

  renderer.model.advance = function(timestamp) {
    var dt = (timestamp - t) * 0.001;
    t = timestamp;

    for (var i in renderer.model.objects.slice(1)) {
      var object = renderer.model.objects.slice(1)[i];

      var r = vec2.fromValues((pointerX - object.translation.getX()) / window.innerWidth, 
                              (pointerY - object.translation.getY()) / window.innerHeight);

      var r_sq = vec2.squaredLength(r);
      if (r_sq < THRESHOLD_DISTANCE || !(pointerX && pointerY)) {
        continue;
      }

      var r_unit = vec2.create();
      vec2.scale(r_unit, r, r_sq);

      var dx = G * Math.pow(dt, 2) * r[0] / r_sq;
      var dy = G * Math.pow(dt, 2) * r[1] / r_sq;

      console.log(r_sq, dt, dx, dy);

      object.translation.setPosition(object.translation.getX() + dx,
                                     object.translation.getY() + dy);
    }
  };

  renderer.render();

  new AnimationController()
    .setModel(renderer.model)
    .setRenderer(renderer)
    .start();
};
