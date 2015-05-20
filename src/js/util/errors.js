
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

