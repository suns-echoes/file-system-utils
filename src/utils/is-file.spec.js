'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, remove } = require('fs-extra');

const { isFile } = require('./is-file.js');


const writeFile = promisify(fs.writeFile);


describe('isFile', () => {
	const rootpath = './temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('returns true if entity is a file', async () => {
		const filepath = join(rootpath, 'file.ext');

		await writeFile(filepath, '');

		const isEntityFile = await isFile(filepath);

		expect(isEntityFile).to.be.true;
	});

	it('returns false if entity is not a file', async () => {
		const dirpath = join(rootpath, 'folder');

		await mkdirs(dirpath);

		const isEntityFile = await isFile(dirpath);

		expect(isEntityFile).to.be.false;
	});

	it('returns false if path does not exist', async () => {
		const path = join(rootpath, 'non/existing/path');

		const isEntityFile = await isFile(path);

		expect(isEntityFile).to.be.false;
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await isFile(null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
