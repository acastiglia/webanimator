
function Model2d() {
  this.objects = [];
}

extend(Model).withObject(Model2d);

Model2d.prototype.addObject = function(object) {
  this.objects.push(object);
};

function Object2d() {
  if (arguments.length < 1) {
    throw new MissingValueError('Must specify object shape');
  }

  this.shape = arguments[0];

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
  if (typeof this.translation === 'undefined') {
    this.translation = new Translation(x, y);
  }
  return this;
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
  Object2d.apply(this, ['rect'].concat(Array.prototype.slice.call(arguments)));
}

