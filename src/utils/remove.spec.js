const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, pathExists, remove: fseRemove } = require('fs-extra');

import { remove } from './remove.js';


const writeFile = promisify(fs.writeFile);


describe('remove', () => {
	const rootpath = 'temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await fseRemove(rootpath);
	});

	it('removes file', async () => {
		const filepath = join(rootpath, 'remove.file');

		await writeFile(filepath, '', { encoding: 'utf8' });
		await remove(filepath);

		const exists = await pathExists(filepath);

		expect(exists).to.be.false;
	});

	it('removes folder', async () => {
		const dirpath = join(rootpath, 'remove');

		await mkdirs(dirpath);
		await remove(dirpath);

		const exists = await pathExists(dirpath);

		expect(exists).to.be.false;
	});

	it('removes folder with content', async () => {
		const dirpath = join(rootpath, 'remove', 'all', 'nested', 'entities');
		const filepath = join(dirpath, 'content.file');

		await mkdirs(dirpath);
		await writeFile(filepath, '', { encoding: 'utf8' });

		await remove(rootpath);

		const exists = await pathExists(rootpath);

		expect(exists).to.be.false;
	});

	it('removes non existing folder', async () => {
		const dirpath = join(rootpath, 'non', 'existing', 'folder');

		await remove(dirpath);

		const exists = await pathExists(dirpath);

		expect(exists).to.be.false;
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await remove(null);
			}

			return expect(fail()).be.rejected;
		});

		it('file is in use', async () => {
			const filepath = join(rootpath, 'block.file');

			const fd = require('fs').openSync(filepath, 'w+');

			async function fail() {
				let error = null;

				try {
					await remove(rootpath);
				}
				catch (err) {
					error = err;
				}
				finally {
					require('fs').closeSync(fd);
				}

				if (error) {
					throw error;
				}
			}

			return expect(fail()).be.rejected;
		});
	});
});
