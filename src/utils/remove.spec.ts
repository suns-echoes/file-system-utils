import { closeSync, openSync } from 'fs';
import { writeFile } from 'fs/promises';
import { join } from 'path';

import { mkdirs, pathExists, remove as fseRemove } from 'fs-extra';

import { remove } from './remove';

describe('remove', () => {
	const rootpath = 'temp/.spec';

	before(async () => {
		await remove(rootpath);
	});

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

	it('copies filtered entities (function)', async () => {
		const path = join(rootpath, 'subpath');
		const badfilename = 'bad-file.ext';
		const goodfilename = 'good-file.ext';

		const filter = (currentPath: string): boolean => {
			return currentPath.indexOf('bad') !== -1;
		};

		await mkdirs(path);
		await writeFile(join(path, badfilename), '');
		await writeFile(join(path, goodfilename), '');

		await remove(path, filter);

		const badExists = await pathExists(join(path, badfilename));
		const goodExists = await pathExists(join(path, goodfilename));

		expect(badExists).to.be.false;
		expect(goodExists).to.be.true;
	});

	it('copies filtered entities (regexp)', async () => {
		const path = join(rootpath, 'subpath');
		const badfilename = 'bad-file.ext';
		const goodfilename = 'good-file.ext';

		const filter = /^.*bad.*$/;

		await mkdirs(path);
		await writeFile(join(path, badfilename), '');
		await writeFile(join(path, goodfilename), '');

		await remove(path, filter);

		const badExists = await pathExists(join(path, badfilename));
		const goodExists = await pathExists(join(path, goodfilename));

		expect(badExists).to.be.false;
		expect(goodExists).to.be.true;
	});

	it('continues non existing folder', async () => {
		const dirpath = join(rootpath, 'non', 'existing', 'folder');

		await remove(dirpath);

		const exists = await pathExists(dirpath);

		expect(exists).to.be.false;
	});

	it('throws if "path" is not a string', async () => {
		const fail = async (): Promise<void> => {
			// @ts-ignore
			await remove(null);
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if file is in use', async () => {
		const filepath = join(rootpath, 'block.file');

		const fd = openSync(filepath, 'w+');

		const fail = async (): Promise<void> => {
			let error = null;

			try {
				await remove(rootpath);
			}
			catch (err) {
				error = err;
			}
			finally {
				closeSync(fd);
			}

			if (error) {
				throw error;
			}
		};

		return expect(fail()).to.be.rejected;
	});
});
