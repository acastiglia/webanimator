
var CENTER = { 
  x: window.innerWidth / 2, 
  y: window.innerHeight / 2
};

var ORBIT_RADIUS = 400;

var PERIOD_MS = 10 * 1000;
var ANG_FREQ = 2 * Math.PI / PERIOD_MS;

var background = new Rectangle()
  .setWidth('100%')
  .setHeight('100%')
  .setFillColor('black');

var circle1 = new Circle()
  .setRadius(80)
  .setPosition(CENTER.x, CENTER.y)
  .setFillColor('yellow');

var circle2 = new Circle()
  .setRadius(10)
  .setPosition(CENTER.x + ORBIT_RADIUS, CENTER.y)
  .setFillColor('blue');

var model = new Model2d()
  .addObject(background)
  .addObject(circle1)
  .addObject(circle2);

model.advance = function(timestamp) {
  circle2.setPosition(
    CENTER.x + ORBIT_RADIUS * Math.sin(ANG_FREQ * timestamp),
    CENTER.y + ORBIT_RADIUS * Math.cos(ANG_FREQ * timestamp)
  );
};

var renderer = SvgRenderer.fromModel(model, '100%', '100%', true);
renderer.attachTo(document.body);

var controller = new AnimationController()
  .setModel(model)
  .setRenderer(renderer)
  .start();

