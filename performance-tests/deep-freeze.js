/* eslint-disable no-console */
'use strict';

const path = require('path');
const fs = require('fs');
const R = require('ramda');
const LIB = require('../index');

const OBJECT_COUNT = 5000;

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
		LIB.deepFreeze(objects[i]);
	}
	console.log('KixxLibrary.deepFreeze() :', Date.now() - start);
});
