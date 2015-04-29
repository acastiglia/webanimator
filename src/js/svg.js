
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

function SvgRoot() {
  this.element = createSvgElement("svg");
} 

SvgRoot.prototype = Object.create(SvgElement.prototype);
SvgRoot.prototype.constructor = SvgRoot;

SvgRoot.prototype.add = function(svgElement) {
  this.element.appendChild(svgElement.element);
};

function SvgRectangle() {
  SvgElement.call(this, 'rect');
}

SvgRectangle.prototype = Object.create(SvgElement.prototype);
SvgRectangle.prototype.constructor = SvgRectangle;

function SvgCircle() {
  SvgElement.call(this, 'circle', arguments[0]);
}

SvgCircle.prototype = Object.create(SvgElement.prototype);
SvgCircle.prototype.constructor = SvgCircle;

