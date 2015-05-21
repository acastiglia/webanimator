
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

