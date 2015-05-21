
function Extender(obj) {
  this.parent = obj;
}

Extender.prototype.withObject = function(child) {
  child.prototype = Object.create(this.parent.prototype);
  child.prototype.constructor = child;
};

function extend(obj) {
  return new Extender(obj);
}



function Exception(message) {
  this.message = message;
}

Exception.prototype.toString = function() {
  return this.constructor.name + ": " + this.message;
};

function UnimplementedError(message) {
  Exception.call(this, message);
}

extend(Exception).withObject(UnimplementedError);

function MissingValueError(message) {
  Exception.call(this, message);
}

extend(Exception).withObject(MissingValueError);



function requestFullscreen(element) {
  element.fullscreen = element.mozRequestFullScreen ||
    element.webkitRequestFullScreen;

  element.fullscreen();
}


 
var elementToObject = (function() { 
  var objectConstructorsByNodeName = {
    'rect': Rectangle,
    'circle': Circle,
    'line': Line,
    'polyline': Polyline,
    'path': Path,
  };

  var baseInitializer = function(svgNode) {
    var obj = new objectConstructorsByNodeName[svgNode.nodeName]();
    if (svgNode.hasAttribute('fill')) {
      obj.setFillColor(svgNode.attributes.fill.value);
    }

    if (svgNode.hasAttribute('transform')) {
      var transformValues = svgNode.attributes.transform.value
        .match(/(\d+(\.\d+)?(,\s*)?)+/)[0].split(',').map(function(s) { return +s; });

      obj.setPosition(transformValues[4], transformValues[5]);
      obj.setRotation(Math.acos(transformValues[0]));
    }

    return obj;
  };

  var initializersByNodeName = {
    'circle': function(svgNode) {
      var c = baseInitializer(svgNode);
      if (svgNode.hasAttribute('r')) {
        c.setRadius(svgNode.attributes.r.value);
      }
      if (svgNode.hasAttribute('cx') || svgNode.hasAttribute('cy')) {
        c.setPosition(c.translation.getX() + (+svgNode.attributes.cx.value || 0),
                      c.translation.getY() + (+svgNode.attributes.cy.value || 0));

        svgNode.removeAttribute('cx');
        svgNode.removeAttribute('cy');
      }
      return c;
    },

    'rect': function(svgNode) {
      var r = baseInitializer(svgNode);
      if (svgNode.hasAttribute('x') || svgNode.hasAttribute('y')) {
        r.setPosition(r.translation.getX() + (+svgNode.attributes.x.value || 0),
                      r.translation.getY() + (+svgNode.attributes.y.value || 0));
      }

      if (svgNode.hasAttribute('width')) {
        r.setWidth(svgNode.attributes.width.value);
      }

      if (svgNode.hasAttribute('height')) {
        r.setHeight(svgNode.attributes.height.value);
      }
      return r;
    },

    'line': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'polyline': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'polygon': function(svgNode) {
      return baseInitializer(svgNode);
    },

    'path': function(svgNode) {
      return baseInitializer(svgNode);
    }
  };

  return function(svgNode) {
    return initializersByNodeName[svgNode.nodeName](svgNode);
  };
})();



function AnimationController() {
}

AnimationController.prototype.setModel = function(model) {
  this.model = model;
  return this;
};

AnimationController.prototype.setRenderer = function(renderer) {
  this.renderer = renderer;
  return this;
}; 

AnimationController.prototype.start = function() {
  (function startAnimation(model, renderer) {
    (function step(timestamp) {
      model.advance(timestamp);
      renderer.render();
      window.requestAnimationFrame(step);
    })(0);
  })(this.model, this.renderer);
};



function Model() {
}

Model.prototype.advance = function() {
  throw new UnimplementedError("Function 'advance' is not defined for this model");
};



function Model2d() {
  this.objects = [];
}

extend(Model).withObject(Model2d);

Model2d.prototype.addObject = function(object) {
  this.objects.push(object);
  return this;
};

function Object2d() {
  if (arguments.length < 1) {
    throw new MissingValueError('Must specify object shape');
  }

  this.shape = arguments[0];

  this.translation = new Translation(0, 0);
  this.rotation = new Rotation(0);

  if (arguments.length >= 2) {
    this.translation = new Translation(arguments[1], arguments[2]);
  } else {
    return;
  }

  if (arguments.length >= 4) {
    this.rotation = new Rotation(arguments[3]);
  } else {
    return;
  }

  if (arguments.length >= 5) {
    this.fill = arguments[4];
  }
}

Object2d.prototype.set = function(name, value) {
  this[name] = value;
  return this;
};

Object2d.prototype.setPosition = function(x, y) {
  if (typeof this.translation === 'undefined' || this.translation === Transformation.IDENTITY) {
    this.translation = new Translation(x, y);
  } else {
    this.translation.setPosition(x, y);
  }
  return this;
};

Object2d.prototype.setRotation = function(angle) {
  if (typeof this.rotation === 'undefined' || this.rotation === Transformation.IDENTITY) {
    this.rotation = new Rotation(angle);
  } else {
    this.rotation.setAngle(angle);
  }
  return this;
};

Object2d.prototype.getTransformation = function() {
  return this.rotation.combine(this.translation);
};

Object2d.prototype.setFillColor = function(color) {
  return this.set('fill', color);
};

function Circle() {
  Object2d.apply(this, ['circle'].concat(Array.prototype.slice.call(arguments)));
  this.radius = 0;
}

extend(Object2d).withObject(Circle);

Circle.prototype.setRadius = function(radius) {
  return this.set('radius', radius);
};

function Rectangle() {
  Object2d.apply(this, ['rectangle'].concat(Array.prototype.slice.call(arguments)));
}

extend(Object2d).withObject(Rectangle);

Rectangle.prototype.setWidth = function(width) {
  return this.set('width', width);
};

Rectangle.prototype.setHeight = function(height) {
  return this.set('height', height);
};

function Line() {
  Object2d.apply(this, ['line'].concat(Array.prototype.slice.call(arquments)));
}

extend(Object2d).withObject(Line);

function Polyline() {
  Object2d.apply(this, ['line'].concat(Array.prototype.slice.call(arquments)));
}

extend(Object2d).withObject(Polyline);

function Polygon() {
  Object2d.apply(this, ['polygon'].concat(Array.prototype.slice.call(arquments)));
}

extend(Object2d).withObject(Polygon);

function Path() {
  Object2d.apply(this, ['path'].concat(Array.prototype.slice.call(arquments)));
}

extend(Object2d).withObject(Path);



var I3 = mat3.create();

function Transformation(transformationMatrix) {
  this.mat = transformationMatrix;
}

Transformation.IDENTITY = new Transformation(mat3.create());

Transformation.prototype.transform = function(vec) {
  vec3.transformMat3(vec, vec, this.mat);
};

Transformation.prototype.transformed = function(vec) {
  var out = vec3.create();
  vec3.transformMat3(out, vec, this.mat);
  return out;
};

Transformation.prototype.combine = function(that) {
  var newTransformation = mat3.create();
  mat3.multiply(newTransformation, this.mat, that.mat);
  return new Transformation(newTransformation);
};

function Translation(x, y) {
  this.mat = mat3.create();
  this.translation_vec = vec3.fromValues(x, y, 1);
  mat3.translate(this.mat, this.mat, this.translation_vec);
}

extend(Transformation).withObject(Translation);

Translation.prototype.setPosition = function(x, y) {
  vec3.set(this.translation_vec, x, y, 1);
  mat3.translate(this.mat, I3, this.translation_vec);
};

Translation.prototype.getX = function() {
  return this.mat[6];
};

Translation.prototype.getY = function() {
  return this.mat[7];
};

function Rotation(angle) {
  this.mat = mat3.create();
  this.angle = angle;
  mat3.rotate(this.mat, this.mat, angle);
}

extend(Transformation).withObject(Rotation);

Rotation.prototype.setAngle = function(angle) {
  this.angle = angle;
  mat3.rotate(this.mat, I3, this.angle);
};

Rotation.prototype.getAngle = function(angle) {
  return this.angle;
};

function Scale(scaleX, scaleY) {
  if (typeof scaleY === 'undefined') {
    scaleY = scaleX;
  }

  this.mat = mat3.create();
  mat3.scale(this.mat, this.mat, vec2.fromValues(scaleX, scaleY));
}

extend(Transformation).withObject(Scale);



function Renderer() {
}

Renderer.prototype.render = function() {
  throw new UnimplementedError("Function 'render' is not defined for this model");
};



function createSvgElement(elementName) {
  return document.createElementNS("http://www.w3.org/2000/svg", elementName);
}

function SvgElement(elementName) {
  if (typeof elementName === 'undefined') {
    return;
  }

  this.element = createSvgElement(elementName);

  if (arguments.length == 2) {
    var props = arguments[1];

    for (var name in props) {
      this.setAttribute(name, props[name]);
    }
  }
}

SvgElement.fromExisting = function(element) {
  var svgElement = new SvgElement();
  svgElement.element = element;
  return svgElement;
};

SvgElement.prototype.setAttribute = function(attrName, value) {
  this.element.setAttribute(attrName, value);
  return this;
};

SvgElement.prototype.setFill = function(fillColor) {
  return this.setAttribute('fill', fillColor);
};

SvgElement.prototype.setTransform = function(matrixTransform) {
  var transformString = 'matrix(';
    transformString += matrixTransform.mat[0] + ',';
    transformString += matrixTransform.mat[1] + ',';
    transformString += matrixTransform.mat[3] + ',';
    transformString += matrixTransform.mat[4] + ',';
    transformString += matrixTransform.mat[6] + ',';
    transformString += matrixTransform.mat[7] + ')';
  return this.setAttribute('transform', transformString);
};

function SvgRoot(width, height, fullscreenOnClick) {
  this.element = createSvgElement("svg");
  this.properties = {};

  this.element.setAttribute('viewbox', "0 0 " + width + " " + height);
  this.element.setAttribute('width', width);
  this.element.setAttribute('height', height);
  if (typeof fullscreenOnClick !== 'undefined') {
    this.element.addEventListener('click', function() {requestFullscreen(this);});
  }
} 

extend(SvgElement).withObject(SvgRoot);

SvgRoot.prototype.addElement = function(svgElement) {
  this.element.appendChild(svgElement.element);
};

SvgRoot.fullScreenSvgForWindow = function () {
  return new SvgRoot(window.innerWidth, window.innerHeight, true);
};

function SvgRectangle() {
  SvgElement.call(this, 'rect', arguments[0]);
}

extend(SvgElement).withObject(SvgRectangle);

SvgRectangle.prototype.setWidth = function(width) {
  return this.setAttribute('width', width);
};

SvgRectangle.prototype.setHeight = function(height) {
  return this.setAttribute('height', height);
};

function SvgCircle() {
  SvgElement.call(this, 'circle', arguments[0]);
}

extend(SvgElement).withObject(SvgCircle);

SvgCircle.prototype.setRadius = function(radius) {
  return this.setAttribute('r', radius);
};

function SvgEllipse() {
  SvgElement.call(this, 'ellipse', arguments[0]);
}

extend(SvgElement).withObject(SvgEllipse);

function SvgPath() {
  SvgElement.call(this, 'path', arguments[0]);
}

extend(SvgElement).withObject(SvgPath);

function SvgLine() {
  SvgElement.call(this, 'line', arguments[0]);
}

extend(SvgElement).withObject(SvgLine);

function SvgPolyline() {
  SvgElement.call(this, 'polyline', arguments[0]);
}

extend(SvgElement).withObject(SvgPolyline);

function SvgPolygon() {
  SvgElement.call(this, 'polygon', arguments[0]);
}

extend(SvgElement).withObject(SvgPolygon);



var objectToElement = {
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
  this.svgElements = [];
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
  for (var objIndex in this.svgElements) {
    this.svgElements[objIndex].setTransform(this.model.objects[objIndex].getTransformation());
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
    var element = objectToElement[obj.shape](obj) || null;

    if (element !== null) {
      renderer.svgElements[i] = element;
      renderer.rootElement.addElement(element);
    }
  }

  return renderer;
};

SvgRenderer.fromGraphic = function(svgRoot, fullscreen) {
  var renderer = new SvgRenderer();
  var model = new Model2d();

  var rootElement = SvgElement.fromExisting(svgRoot);
  if (fullscreen) {
    rootElement.element.addEventListener('click', function(){requestFullscreen(rootElement.element);});
  }
  renderer.rootElement = rootElement;
  renderer.model = model;

  for (var i = 0, len = rootElement.element.childElementCount; i < len; i++) {
    var child = rootElement.element.children[i];
    model.addObject(elementToObject(child));
    renderer.svgElements.push(SvgElement.fromExisting(child));
  }

  return renderer;
};

