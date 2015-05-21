
var I3 = mat3.create();

function Transformation(transformationMatrix) {
  this.mat = transformationMatrix;
}

Transformation.IDENTITY = new Transformation(mat3.create());

Transformation.prototype.transform = function(vec) {
  vec3.transformMat3(vec, vec, this.mat);
};

Transformation.prototype.transformed = function(vec) {
  var out = vec3.create();
  vec3.transformMat3(out, vec, this.mat);
  return out;
};

Transformation.prototype.combine = function(that) {
  var newTransformation = mat3.create();
  mat3.multiply(newTransformation, this.mat, that.mat);
  return new Transformation(newTransformation);
};

Transformation.fromString = function(transformString) {
  
};

function Translation(x, y) {
  this.mat = mat3.create();
  this.translation_vec = vec3.fromValues(x, y, 1);
  mat3.translate(this.mat, this.mat, this.translation_vec);
}

extend(Transformation).withObject(Translation);

Translation.prototype.setPosition = function(x, y) {
  vec3.set(this.translation_vec, x, y, 1);
  mat3.translate(this.mat, I3, this.translation_vec);
};

Translation.prototype.getX = function() {
  return this.mat[6];
};

Translation.prototype.getY = function() {
  return this.mat[7];
};

function Rotation(angle) {
  this.mat = mat3.create();
  this.angle = angle;
  mat3.rotate(this.mat, this.mat, angle);
}

extend(Transformation).withObject(Rotation);

Rotation.prototype.setAngle = function(angle) {
  this.angle = angle;
  mat3.rotate(this.mat, I3, this.angle);
};

Rotation.prototype.getAngle = function(angle) {
  return this.angle;
};

function Scale(scaleX, scaleY) {
  if (typeof scaleY === 'undefined') {
    scaleY = scaleX;
  }

  this.mat = mat3.create();
  mat3.scale(this.mat, this.mat, vec2.fromValues(scaleX, scaleY));
}

extend(Transformation).withObject(Scale);

