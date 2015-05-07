
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

