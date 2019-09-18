'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, remove } = require('fs-extra');

const { listFiles } = require('./list-files.js');


const symlink = promisify(fs.symlink);
const writeFile = promisify(fs.writeFile);


describe('listFiles', () => {
	const rootpath = join('temp', '.spec');

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('returns list of files', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const fileList = await listFiles(rootpath);

		expect(fileList).to.be.eql([
			filepath1,
			filepath2,
		]);
	});

	it('return list of files with depth = 0', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const fileList = await listFiles(rootpath, 0);

		expect(fileList).to.be.eql([
			filepath1,
		]);
	});

	it('skips symlinks', async () => {
		const filepath = join(rootpath, 'file.ext');
		const symlinkpath = join(rootpath, 'symlink');

		await writeFile(filepath, '');
		await symlink(filepath, symlinkpath);

		const fileList = await listFiles(rootpath);

		expect(fileList).to.be.eql([
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
