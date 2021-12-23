import { writeFile } from 'fs/promises';
import { join } from 'path';

import { mkdirs, remove } from 'fs-extra';

import { isFolder } from './is-folder';

describe('isFolder', () => {
	const rootpath = './temp/.spec';

	before(async () => {
		await remove(rootpath);
	});

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

	it('throws if "path" is not a string', async () => {
		const fail = async (): Promise<void> => {
			// @ts-ignore
			await isFolder(null);
		};

		return expect(fail()).to.be.rejected;
	});
});
