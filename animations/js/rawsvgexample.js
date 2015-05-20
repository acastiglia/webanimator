
var graphic = SvgRoot.fullScreenSvgForWindow();
document.body.appendChild(graphic.element);

var rect = new SvgRectangle({
  'width': '100%', 'height': '100%', 'fill': '#95B3D7'
});

var circ = new SvgCircle({'cx' : 40, 'cy' : 40, 'r' : 20, 'fill' : 'red'});

graphic.addElement(rect);
graphic.addElement(circ);


var renderer = {
  render: function() {}
};

extend(Renderer).withObject(renderer);

var model = {
  advance: function(timestamp) {
    this.x = window.innerWidth / 2 + window.innerWidth / 2 * Math.sin(0.001 * timestamp);
    this.y = window.innerHeight / 2 + window.innerHeight / 2 * Math.cos(0.003 * timestamp);
    circ.setTransform(new Translation(this.x, this.y));
    t = Date.now();
  }
};

extend(Model2d).withObject(model);

var controller = new AnimationController()
  .setModel(model)
  .setRenderer(renderer);

controller.start();

