
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

SvgRoot.prototype = Object.create(SvgElement.prototype);
SvgRoot.prototype.constructor = SvgRoot;

SvgRoot.prototype.add = function(svgElement) {
  this.element.appendChild(svgElement.element);
};

function SvgRectangle() {
  SvgElement.call(this, 'rect', arguments[0]);
}

SvgRectangle.prototype = Object.create(SvgElement.prototype);
SvgRectangle.prototype.constructor = SvgRectangle;

function SvgCircle() {
  SvgElement.call(this, 'circle', arguments[0]);
}

SvgCircle.prototype = Object.create(SvgElement.prototype);
SvgCircle.prototype.constructor = SvgCircle;


