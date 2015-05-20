
var objectMappings = {
  circle: function(object) {
    return new SvgCircle()
      .setRadius(object.radius)
      .setTransform(object.getTransformation() || Transformation.IDENTITY)
      .setFill(object.fill || "#ffffff");
  },

  rectangle: function(object) {
    return new SvgRectangle()
      .setWidth(object.width || 0)
      .setHeight(object.height || 0)
      .setFill(object.fill || '#ffffff');
  }
};

function SvgRenderer() {
  this.elements = [];
  this.objectMap = {};
  this.rootElement = null;
}

extend(Renderer).withObject(SvgRenderer);

SvgRenderer.prototype.attachTo = function(parentElement) {
  parentElement.appendChild(this.rootElement.element);
};

SvgRenderer.prototype.addElement = function(element) {
  this.elements.push(element);
};

SvgRenderer.fromModel = function(model, width, height, fullscreen) {
  var renderer = new SvgRenderer();

  if (fullscreen) {
    renderer.rootElement = SvgRoot.fullScreenSvgForWindow();
  } else {
    renderer.rootElement = new SvgRoot(width, height, false);
  }

  for (var i in model.objects) {
    var obj = model.objects[i];

    var element = objectMappings[obj.shape](obj) || null;

    if (element !== null) {
      renderer.objectMap[obj] = element;
      renderer.rootElement.addElement(element);
    }
  }

  return renderer;
};

