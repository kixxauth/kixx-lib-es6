'use strict';

const protoToString = Object.prototype.toString;

function isPlainObject(obj) {
	if (obj && typeof obj === 'object') {
		const proto = Object.getPrototypeOf(obj);
		return proto === Object.prototype || proto === null;
	}
	return false;
}

function compact(list) {
	return list.filter((x) => x);
}
exports.compact = compact;

function mergeDeep(target, ...objects) {
	if (!isPlainObject(target)) {
		throw new TypeError('Merge target must be a plain Object');
	}

	for (let i = 0; i < objects.length; i++) {
		mergeObject(target, objects[i]);
	}

	return target;
}
exports.mergeDeep = mergeDeep;

function mergeObject(target, source) {
	if (source && typeof source === 'object') {
		const keys = Object.keys(source);

		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const val = source[key];

			// Array and Date instances are simply copied by reference. We do that here, otherwise they
			// would trigger the (val && typeof val === 'object') check.
			if (Array.isArray(val) || protoToString.call(val) === '[object Date]') {
				target[key] = val;
			} else if (val && typeof val === 'object') {
				// Objects are recursively merged, but we need to ensure the target object exists first.
				if (!target[key] || typeof target[key] !== 'object') {
					target[key] = {};
				}
				target[key] = mergeObject(target[key], val);
			} else {
				// Assume it is a primitive value and copy by reference.
				target[key] = val;
			}
		}
	}

	return target;
}

function clone(obj) {
	const type = typeof obj;

	if (obj === null || type !== 'object') return obj;

	if (Array.isArray(obj)) return obj.map(clone);

	if (protoToString.call(obj) === '[object Date]') {
		return new Date(obj.getTime());
	}

	const keys = Object.keys(obj);
	const newObj = {};

	for (let i = 0; i < keys.length; i++) {
		const k = keys[i];
		newObj[k] = clone(obj[k]);
	}

	return newObj;
}
exports.clone = clone;

function deepFreeze(obj) {
	if (obj === null || typeof obj !== 'object') return obj;

	Object.freeze(obj);

	if (Array.isArray(obj)) {
		obj.forEach((prop) => deepFreeze(prop));
	} else {
		// Object.getOwnProperties() returns non-enumerable props, where
		// Object.keys only returns *enumerable* props.
		Object.getOwnPropertyNames(obj).forEach((key) => deepFreeze(obj[key]));
	}

	return obj;
}
exports.deepFreeze = deepFreeze;

// The minimum is inclusive and the maximum is exclusive.
function random(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
exports.random = random;

function sampleOne(list) {
	return list[random(0, list.length)];
}
exports.sampleOne = sampleOne;

function clamp(min, max, n) {
	max = max >= 1 ? max : 1;
	if (typeof n !== 'number' || n < min) return min;
	if (n >= max) return max - 1;
	return n;
}
exports.clamp = clamp;

exports.regexp = Object.freeze({
	/* eslint-disable no-useless-escape */
	EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	EMAIL_UNICODE: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
	/* eslint-enable */
});
