
function createSvgElement(elementName) {
  return document.createElementNS("http://www.w3.org/2000/svg", elementName);
}

function SvgElement(elementName) {
  this.element = createSvgElement(elementName);

  if (arguments.length == 2) {
    var props = arguments[1];

    for (var name in props) {
      this.setAttribute(name, props[name]);
    }
  }
}

SvgElement.prototype.setAttribute = function(attrName, value) {
  this.element.setAttribute(attrName, value);
};

SvgElement.prototype.setTransform = function(matrixTransform) {
  var transformString = 'matrix(';
    transformString += matrixTransform.mat[0] + ',';
    transformString += matrixTransform.mat[1] + ',';
    transformString += matrixTransform.mat[3] + ',';
    transformString += matrixTransform.mat[4] + ',';
    transformString += matrixTransform.mat[6] + ',';
    transformString += matrixTransform.mat[7] + ')';
  this.setAttribute('transform', transformString);
};

function SvgRoot() {
  function fullscreen() {
    this.requestFullScreen = this.mozRequestFullScreen ||
      this.webkitRequestFullScreen;
  
    this.requestFullScreen();
  }

  this.element = createSvgElement("svg");
  this.properties = {};

  if (arguments.length === 2) {
    this.element.setAttribute('width', arguments[0]);
    this.element.setAttribute('height', arguments[1]);
    return;
  }

  if (arguments.length === 1) {
    var props = arguments[0];

    this.element.setAttribute('width', props.width || null);
    this.element.setAttribute('height', props.height || null);

    if (props.fullscreenOnClick) {
      this.element.addEventListener('click', fullscreen);
    }
  }
} 

extend(SvgElement).withObject(SvgRoot);

SvgRoot.prototype.add = function(svgElement) {
  this.element.appendChild(svgElement.element);
};

function SvgRectangle() {
  SvgElement.call(this, 'rect', arguments[0]);
}

extend(SvgElement).withObject(SvgRectangle);

function SvgCircle() {
  SvgElement.call(this, 'circle', arguments[0]);
}

extend(SvgElement).withObject(SvgCircle);

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

extend(SvgPolyline).withObject(SvgElement);

function SvgPolygon() {
  SvgElement.call(this, 'polygon', arguments[0]);
}

extend(SvgElement).withObject(SvgPolygon);

