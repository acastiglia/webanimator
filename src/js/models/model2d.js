
function Model2d() {
}

extend(Model).withObject(Model2d);

function Object2d() {
  if (arguments.length >= 2) {
    this.position = new Position(arguments[0], arguments[1]);
  }

  if (arguments.length >= 3) {
    this.shape = arguments[2];
  }

  if (arguments.length >= 4) {
    this.fill = arguments[3];
  }
}

function Position(x, y) {
  this.x = x;
  this.y = y;
}

