
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
  this.x = 250 + 250 * Math.sin(0.001 * timestamp);
  this.y = 250 + 250 * Math.cos(0.003 * timestamp);
  circ.setTransform(new Translation(this.x, this.y));
  t = Date.now();
};

var controller = new AnimationController()
  .setModel(model)
  .setRenderer(renderer);

controller.start();

