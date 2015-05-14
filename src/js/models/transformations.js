
function Transformation() {
}

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
  mat3.multiply(newTransformation, this, that);
  return newTransformation;
};

function Translation(x, y) {
  this.mat = mat3.create();
  mat3.translate(this.mat, this.mat, vec3.fromValues(x, y, 1));
}

extend(Transformation).withObject(Translation);

function Rotation(angle) {
  this.mat = mat3.create();
  mat3.rotate(this.mat, this.mat, angle);
}

extend(Transformation).withObject(Rotation);

function Scale(scaleX, scaleY) {
  if (typeof scaleY === 'undefined') {
    scaleY = scaleX;
  }

  this.mat = mat3.create();
  mat3.scale(this.mat, this.mat, vec2.fromValues(scaleX, scaleY));
}

extend(Transformation).withObject(Scale);

