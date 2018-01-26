'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.CubeTexture = undefined;

var _Texture = require('./Texture.js');

var _constants = require('cubetexture/constants.js');

/**
 * @author mrdoob / http://mrdoob.com/
 */

function CubeTexture(images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding) {

	images = images !== undefined ? images : [];
	mapping = mapping !== undefined ? mapping : _constants.CubeReflectionMapping;

	_Texture.Texture.call(this, images, mapping, wrapS, wrapT, magFilter, minFilter, format, type, anisotropy, encoding);

	this.flipY = false;
}

CubeTexture.prototype = Object.create(_Texture.Texture.prototype);
CubeTexture.prototype.constructor = CubeTexture;

CubeTexture.prototype.isCubeTexture = true;

Object.defineProperty(CubeTexture.prototype, 'images', {

	get: function get() {

		return this.image;
	},

	set: function set(value) {

		this.image = value;
	}

});

exports.CubeTexture = CubeTexture;
