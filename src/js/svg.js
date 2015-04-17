
function createSvgElement(elementName) {
  return document.createElementNS("http://www.w3.org/2000/svg", elementName);
}

function SvgElement(elementName) {
  this.element = createSvgElement(elementName);
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

