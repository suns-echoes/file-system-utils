'use strict';

const fs = require('fs');
const { promisify } = require('util');

const { FileSystemUtils } = require('./file-system-utils.js');


const readdir = promisify(fs.readdir);


async function findMethods() {
	const entities = await readdir('./src/utils');
	const matchNonSpecFiles = /^((?!\.spec\.js).)*\.js$/;
	const methods = [];

	for (const entity of entities) {
		if (matchNonSpecFiles.test(entity)) {
			const module = require(`./utils/${entity}`);
			const keys = Object.keys(module);

			keys.forEach((key) => {
				if (typeof module[key] === 'function') {
					methods.push(key);
				}
				else {
					throw new Error(`"${entity}" module exports entity "${key}" that is not a function`);
				}
			});
		}
	}

	return methods;
}


describe('FileSystemUtils', () => {
	it('exports all existing methods', async () => {
		const exportedMethods = Object.keys(FileSystemUtils);
		const foundMethods = await findMethods();

		expect(exportedMethods).to.be.eql(foundMethods);
	});
});
