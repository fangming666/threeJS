'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Vector3 = undefined;

var _Math2 = require('./Math.js');

var _Matrix = require('./Matrix4.js');

var _Quaternion = require('./Quaternion.js');

/**
 * @author mrdoob / http://mrdoob.com/
 * @author kile / http://kile.stravaganza.org/
 * @author philogb / http://blog.thejit.org/
 * @author mikael emtinger / http://gomo.se/
 * @author egraether / http://egraether.com/
 * @author WestLangley / http://github.com/WestLangley
 */

function Vector3(x, y, z) {

	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

Object.assign(Vector3.prototype, {

	isVector3: true,

	set: function set(x, y, z) {

		this.x = x;
		this.y = y;
		this.z = z;

		return this;
	},

	setScalar: function setScalar(scalar) {

		this.x = scalar;
		this.y = scalar;
		this.z = scalar;

		return this;
	},

	setX: function setX(x) {

		this.x = x;

		return this;
	},

	setY: function setY(y) {

		this.y = y;

		return this;
	},

	setZ: function setZ(z) {

		this.z = z;

		return this;
	},

	setComponent: function setComponent(index, value) {

		switch (index) {

			case 0:
				this.x = value;break;
			case 1:
				this.y = value;break;
			case 2:
				this.z = value;break;
			default:
				throw new Error('index is out of range: ' + index);

		}

		return this;
	},

	getComponent: function getComponent(index) {

		switch (index) {

			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			default:
				throw new Error('index is out of range: ' + index);

		}
	},

	clone: function clone() {

		return new this.constructor(this.x, this.y, this.z);
	},

	copy: function copy(v) {

		this.x = v.x;
		this.y = v.y;
		this.z = v.z;

		return this;
	},

	add: function add(v, w) {

		if (w !== undefined) {

			console.warn('THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.');
			return this.addVectors(v, w);
		}

		this.x += v.x;
		this.y += v.y;
		this.z += v.z;

		return this;
	},

	addScalar: function addScalar(s) {

		this.x += s;
		this.y += s;
		this.z += s;

		return this;
	},

	addVectors: function addVectors(a, b) {

		this.x = a.x + b.x;
		this.y = a.y + b.y;
		this.z = a.z + b.z;

		return this;
	},

	addScaledVector: function addScaledVector(v, s) {

		this.x += v.x * s;
		this.y += v.y * s;
		this.z += v.z * s;

		return this;
	},

	sub: function sub(v, w) {

		if (w !== undefined) {

			console.warn('THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.');
			return this.subVectors(v, w);
		}

		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;

		return this;
	},

	subScalar: function subScalar(s) {

		this.x -= s;
		this.y -= s;
		this.z -= s;

		return this;
	},

	subVectors: function subVectors(a, b) {

		this.x = a.x - b.x;
		this.y = a.y - b.y;
		this.z = a.z - b.z;

		return this;
	},

	multiply: function multiply(v, w) {

		if (w !== undefined) {

			console.warn('THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.');
			return this.multiplyVectors(v, w);
		}

		this.x *= v.x;
		this.y *= v.y;
		this.z *= v.z;

		return this;
	},

	multiplyScalar: function multiplyScalar(scalar) {

		this.x *= scalar;
		this.y *= scalar;
		this.z *= scalar;

		return this;
	},

	multiplyVectors: function multiplyVectors(a, b) {

		this.x = a.x * b.x;
		this.y = a.y * b.y;
		this.z = a.z * b.z;

		return this;
	},

	applyEuler: function () {

		var quaternion = new _Quaternion.Quaternion();

		return function applyEuler(euler) {

			if (!(euler && euler.isEuler)) {

				console.error('THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.');
			}

			return this.applyQuaternion(quaternion.setFromEuler(euler));
		};
	}(),

	applyAxisAngle: function () {

		var quaternion = new _Quaternion.Quaternion();

		return function applyAxisAngle(axis, angle) {

			return this.applyQuaternion(quaternion.setFromAxisAngle(axis, angle));
		};
	}(),

	applyMatrix3: function applyMatrix3(m) {

		var x = this.x,
		    y = this.y,
		    z = this.z;
		var e = m.elements;

		this.x = e[0] * x + e[3] * y + e[6] * z;
		this.y = e[1] * x + e[4] * y + e[7] * z;
		this.z = e[2] * x + e[5] * y + e[8] * z;

		return this;
	},

	applyMatrix4: function applyMatrix4(m) {

		var x = this.x,
		    y = this.y,
		    z = this.z;
		var e = m.elements;

		var w = 1 / (e[3] * x + e[7] * y + e[11] * z + e[15]);

		this.x = (e[0] * x + e[4] * y + e[8] * z + e[12]) * w;
		this.y = (e[1] * x + e[5] * y + e[9] * z + e[13]) * w;
		this.z = (e[2] * x + e[6] * y + e[10] * z + e[14]) * w;

		return this;
	},

	applyQuaternion: function applyQuaternion(q) {

		var x = this.x,
		    y = this.y,
		    z = this.z;
		var qx = q.x,
		    qy = q.y,
		    qz = q.z,
		    qw = q.w;

		// calculate quat * vector

		var ix = qw * x + qy * z - qz * y;
		var iy = qw * y + qz * x - qx * z;
		var iz = qw * z + qx * y - qy * x;
		var iw = -qx * x - qy * y - qz * z;

		// calculate result * inverse quat

		this.x = ix * qw + iw * -qx + iy * -qz - iz * -qy;
		this.y = iy * qw + iw * -qy + iz * -qx - ix * -qz;
		this.z = iz * qw + iw * -qz + ix * -qy - iy * -qx;

		return this;
	},

	project: function () {

		var matrix = new _Matrix.Matrix4();

		return function project(camera) {

			matrix.multiplyMatrices(camera.projectionMatrix, matrix.getInverse(camera.matrixWorld));
			return this.applyMatrix4(matrix);
		};
	}(),

	unproject: function () {

		var matrix = new _Matrix.Matrix4();

		return function unproject(camera) {

			matrix.multiplyMatrices(camera.matrixWorld, matrix.getInverse(camera.projectionMatrix));
			return this.applyMatrix4(matrix);
		};
	}(),

	transformDirection: function transformDirection(m) {

		// input: THREE.Matrix4 affine matrix
		// vector interpreted as a direction

		var x = this.x,
		    y = this.y,
		    z = this.z;
		var e = m.elements;

		this.x = e[0] * x + e[4] * y + e[8] * z;
		this.y = e[1] * x + e[5] * y + e[9] * z;
		this.z = e[2] * x + e[6] * y + e[10] * z;

		return this.normalize();
	},

	divide: function divide(v) {

		this.x /= v.x;
		this.y /= v.y;
		this.z /= v.z;

		return this;
	},

	divideScalar: function divideScalar(scalar) {

		return this.multiplyScalar(1 / scalar);
	},

	min: function min(v) {

		this.x = Math.min(this.x, v.x);
		this.y = Math.min(this.y, v.y);
		this.z = Math.min(this.z, v.z);

		return this;
	},

	max: function max(v) {

		this.x = Math.max(this.x, v.x);
		this.y = Math.max(this.y, v.y);
		this.z = Math.max(this.z, v.z);

		return this;
	},

	clamp: function clamp(min, max) {

		// assumes min < max, componentwise

		this.x = Math.max(min.x, Math.min(max.x, this.x));
		this.y = Math.max(min.y, Math.min(max.y, this.y));
		this.z = Math.max(min.z, Math.min(max.z, this.z));

		return this;
	},

	clampScalar: function () {

		var min = new Vector3();
		var max = new Vector3();

		return function clampScalar(minVal, maxVal) {

			min.set(minVal, minVal, minVal);
			max.set(maxVal, maxVal, maxVal);

			return this.clamp(min, max);
		};
	}(),

	clampLength: function clampLength(min, max) {

		var length = this.length();

		return this.divideScalar(length || 1).multiplyScalar(Math.max(min, Math.min(max, length)));
	},

	floor: function floor() {

		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		this.z = Math.floor(this.z);

		return this;
	},

	ceil: function ceil() {

		this.x = Math.ceil(this.x);
		this.y = Math.ceil(this.y);
		this.z = Math.ceil(this.z);

		return this;
	},

	round: function round() {

		this.x = Math.round(this.x);
		this.y = Math.round(this.y);
		this.z = Math.round(this.z);

		return this;
	},

	roundToZero: function roundToZero() {

		this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x);
		this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y);
		this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z);

		return this;
	},

	negate: function negate() {

		this.x = -this.x;
		this.y = -this.y;
		this.z = -this.z;

		return this;
	},

	dot: function dot(v) {

		return this.x * v.x + this.y * v.y + this.z * v.z;
	},

	// TODO lengthSquared?

	lengthSq: function lengthSq() {

		return this.x * this.x + this.y * this.y + this.z * this.z;
	},

	length: function length() {

		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	},

	manhattanLength: function manhattanLength() {

		return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
	},

	normalize: function normalize() {

		return this.divideScalar(this.length() || 1);
	},

	setLength: function setLength(length) {

		return this.normalize().multiplyScalar(length);
	},

	lerp: function lerp(v, alpha) {

		this.x += (v.x - this.x) * alpha;
		this.y += (v.y - this.y) * alpha;
		this.z += (v.z - this.z) * alpha;

		return this;
	},

	lerpVectors: function lerpVectors(v1, v2, alpha) {

		return this.subVectors(v2, v1).multiplyScalar(alpha).add(v1);
	},

	cross: function cross(v, w) {

		if (w !== undefined) {

			console.warn('THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.');
			return this.crossVectors(v, w);
		}

		return this.crossVectors(this, v);
	},

	crossVectors: function crossVectors(a, b) {

		var ax = a.x,
		    ay = a.y,
		    az = a.z;
		var bx = b.x,
		    by = b.y,
		    bz = b.z;

		this.x = ay * bz - az * by;
		this.y = az * bx - ax * bz;
		this.z = ax * by - ay * bx;

		return this;
	},

	projectOnVector: function projectOnVector(vector) {

		var scalar = vector.dot(this) / vector.lengthSq();

		return this.copy(vector).multiplyScalar(scalar);
	},

	projectOnPlane: function () {

		var v1 = new Vector3();

		return function projectOnPlane(planeNormal) {

			v1.copy(this).projectOnVector(planeNormal);

			return this.sub(v1);
		};
	}(),

	reflect: function () {

		// reflect incident vector off plane orthogonal to normal
		// normal is assumed to have unit length

		var v1 = new Vector3();

		return function reflect(normal) {

			return this.sub(v1.copy(normal).multiplyScalar(2 * this.dot(normal)));
		};
	}(),

	angleTo: function angleTo(v) {

		var theta = this.dot(v) / Math.sqrt(this.lengthSq() * v.lengthSq());

		// clamp, to handle numerical problems

		return Math.acos(_Math2._Math.clamp(theta, -1, 1));
	},

	distanceTo: function distanceTo(v) {

		return Math.sqrt(this.distanceToSquared(v));
	},

	distanceToSquared: function distanceToSquared(v) {

		var dx = this.x - v.x,
		    dy = this.y - v.y,
		    dz = this.z - v.z;

		return dx * dx + dy * dy + dz * dz;
	},

	manhattanDistanceTo: function manhattanDistanceTo(v) {

		return Math.abs(this.x - v.x) + Math.abs(this.y - v.y) + Math.abs(this.z - v.z);
	},

	setFromSpherical: function setFromSpherical(s) {

		var sinPhiRadius = Math.sin(s.phi) * s.radius;

		this.x = sinPhiRadius * Math.sin(s.theta);
		this.y = Math.cos(s.phi) * s.radius;
		this.z = sinPhiRadius * Math.cos(s.theta);

		return this;
	},

	setFromCylindrical: function setFromCylindrical(c) {

		this.x = c.radius * Math.sin(c.theta);
		this.y = c.y;
		this.z = c.radius * Math.cos(c.theta);

		return this;
	},

	setFromMatrixPosition: function setFromMatrixPosition(m) {

		var e = m.elements;

		this.x = e[12];
		this.y = e[13];
		this.z = e[14];

		return this;
	},

	setFromMatrixScale: function setFromMatrixScale(m) {

		var sx = this.setFromMatrixColumn(m, 0).length();
		var sy = this.setFromMatrixColumn(m, 1).length();
		var sz = this.setFromMatrixColumn(m, 2).length();

		this.x = sx;
		this.y = sy;
		this.z = sz;

		return this;
	},

	setFromMatrixColumn: function setFromMatrixColumn(m, index) {

		return this.fromArray(m.elements, index * 4);
	},

	equals: function equals(v) {

		return v.x === this.x && v.y === this.y && v.z === this.z;
	},

	fromArray: function fromArray(array, offset) {

		if (offset === undefined) offset = 0;

		this.x = array[offset];
		this.y = array[offset + 1];
		this.z = array[offset + 2];

		return this;
	},

	toArray: function toArray(array, offset) {

		if (array === undefined) array = [];
		if (offset === undefined) offset = 0;

		array[offset] = this.x;
		array[offset + 1] = this.y;
		array[offset + 2] = this.z;

		return array;
	},

	fromBufferAttribute: function fromBufferAttribute(attribute, index, offset) {

		if (offset !== undefined) {

			console.warn('THREE.Vector3: offset has been removed from .fromBufferAttribute().');
		}

		this.x = attribute.getX(index);
		this.y = attribute.getY(index);
		this.z = attribute.getZ(index);

		return this;
	}

});

exports.Vector3 = Vector3;
