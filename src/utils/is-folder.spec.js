const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, remove } = require('fs-extra');

import { isFolder } from './is-folder.js';


const writeFile = promisify(fs.writeFile);


describe('isFolder', () => {
	const rootpath = './temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('returns true if entity is a folder', async () => {
		const dirpath = join(rootpath, 'folder');

		await mkdirs(dirpath);

		const isEntityFolder = await isFolder(dirpath);

		expect(isEntityFolder).to.be.true;
	});

	it('returns false if entity is not a folder', async () => {
		const filepath = join(rootpath, 'file.ext');

		await writeFile(filepath, '');

		const isEntityFolder = await isFolder(filepath);

		expect(isEntityFolder).to.be.false;
	});

	it('returns false if path does not exist', async () => {
		const path = join(rootpath, 'non/existing/path');

		const isEntityFolder = await isFolder(path);

		expect(isEntityFolder).to.be.false;
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await isFolder(null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
