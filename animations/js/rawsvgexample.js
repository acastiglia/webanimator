
var graphic = new SvgRoot({
  'width': window.innerWidth, 'height': window.innerHeight,
  'fullscreenOnClick': true
});

document.body.appendChild(graphic.element);

var rect = new SvgRectangle({
  'width': window.innerWidth, 'height': window.innerHeight, 'fill': '#95B3D7'
});

var circ = new SvgCircle({'cx' : 40, 'cy' : 40, 'r' : 20, 'fill' : 'red'});

graphic.add(rect);
graphic.add(circ);


var model = function() {};
extend(Model2d).withObject(model);

var renderer = function() {};
renderer.render = function() {
};

model.advance = function(timestamp) {
  var x = Math.sin(timestamp) * (window.innerWidth / 2);
  circ.setTransform(new Translation(x, 100));
  t = Date.now();
};

var controller = new AnimationController();
controller.model = model;
controller.renderer = renderer;
controller.start();
