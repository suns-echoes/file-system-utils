const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, remove } = require('fs-extra');

import { listFiles } from './list-files.js';


const symlink = promisify(fs.symlink);
const writeFile = promisify(fs.writeFile);


describe('listFiles', () => {
	const rootpath = './temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('returns list of files', async () => {
		const subfolderpath = join(rootpath, 'symlink');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const filelist = await listFiles(rootpath);

		expect(filelist).to.be.eql([
			filepath1,
			filepath2,
		]);
	});

	it('skips symlinks', async () => {
		const filepath = join(rootpath, 'file.ext');
		const symlinkpath = join(rootpath, 'symlink');

		await writeFile(filepath, '');
		await symlink(filepath, symlinkpath);

		const filelist = await listFiles(rootpath);

		expect(filelist).to.be.eql([
			filepath,
		]);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await listFiles(null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
