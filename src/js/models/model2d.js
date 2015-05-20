
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

  this.translation = Transformation.IDENTITY;
  this.rotation = Transformation.IDENTITY;

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
    this.rotation.setRotation(angle);
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

