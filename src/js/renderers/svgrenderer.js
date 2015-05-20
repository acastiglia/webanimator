
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
  this.model = null;
  this.objects = [];
  this.rootElement = null;
}

extend(Renderer).withObject(SvgRenderer);

SvgRenderer.prototype.attachTo = function(parentElement) {
  parentElement.appendChild(this.rootElement.element);
};

SvgRenderer.prototype.addElement = function(element) {
  this.elements.push(element);
};

SvgRenderer.prototype.render = function() {
  for (var objIndex in this.objects) {
    this.objects[objIndex].setTransform(this.model.objects[objIndex].getTransformation());
  }
};

SvgRenderer.fromModel = function(model, width, height, fullscreen) {
  var renderer = new SvgRenderer();
  renderer.model = model;

  if (fullscreen) {
    renderer.rootElement = SvgRoot.fullScreenSvgForWindow();
  } else {
    renderer.rootElement = new SvgRoot(width, height, false);
  }

  for (var i in model.objects) {
    var obj = model.objects[i];
    var element = objectMappings[obj.shape](obj) || null;

    if (element !== null) {
      renderer.objects[i] = element;
      renderer.rootElement.addElement(element);
    }
  }

  return renderer;
};

