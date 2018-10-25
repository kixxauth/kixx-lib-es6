/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');
const R = require('ramda');
const KixxLibrary = require('../index');

const LIB = process.argv[2];

if (LIB !== 'ramda' && LIB !== 'kixx') {
	throw new Error('process.argv[2] must be "ramda" or "kixx"');
}

const OBJECT_COUNT = 5000;

const mergeDeep = LIB === 'ramda' ? R.mergeDeepRight : KixxLibrary.mergeDeep;

// Use package.json as random data generator.
const pkgFile = path.join(path.dirname(__dirname), 'package.json');

fs.readFile(pkgFile, {encoding: 'utf8'}, (err, text) => {
	if (err) {
		console.error(`Error reading file ${pkgFile}`);
		console.log(err.stack);
		return;
	}

	console.log(`With ${OBJECT_COUNT} objects ...`);

	const objects = [];

	for (let i = OBJECT_COUNT - 1; i >= 0; i--) {
		const obj = JSON.parse(text);
		obj.list = R.range(0, 5).map(() => JSON.parse(text));
		obj.nested = JSON.parse(JSON.stringify(obj));
		objects.push(obj);
	}

	const start = Date.now();
	for (let i = objects.length - 1; i >= 0; i--) {
		mergeDeep(objects[i], objects[i + 1] || {});
	}
	console.log(`${LIB} mergeDeep() : ${Date.now() - start}`);
});
