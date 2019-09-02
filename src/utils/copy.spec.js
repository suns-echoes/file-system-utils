'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { pathExists, mkdirs, remove } = require('fs-extra');

const { copy } = require('./copy.js');


const symlink = promisify(fs.symlink);
const writeFile = promisify(fs.writeFile);


describe('copy', () => {
	const rootpath = './temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('copies file with new name', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destpath = join(rootpath, 'dest');
		const destfilepath = join(rootpath, 'dest/file-copy.ext');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await writeFile(srcfilepath, '');

		await copy(srcfilepath, destfilepath);

		const exists = await pathExists(destfilepath);

		expect(exists).to.be.true;
	});

	it('copies file to directory', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destpath = join(rootpath, 'dest');
		const destfilepath = join(rootpath, 'dest/file.ext');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await writeFile(srcfilepath, '');

		await copy(srcfilepath, destpath);

		const exists = await pathExists(destfilepath);

		expect(exists).to.be.true;
	});

	it('copies directory', async () => {
		const srcpath = join(rootpath, 'src');
		const destpath = join(rootpath, 'dest');
		const nestedpath = 'nested/dir/to/copy';

		await mkdirs(join(srcpath, nestedpath));
		await mkdirs(destpath);

		await copy(srcpath, destpath);

		const exists = await pathExists(join(destpath, nestedpath));

		expect(exists).to.be.true;
	});

	it('copies directory with content', async () => {
		const srcpath = join(rootpath, 'src');
		const destpath = join(rootpath, 'dest');
		const nestedpath = 'nested/dir/to/copy';
		const filename = 'file.ext';

		await mkdirs(join(srcpath, nestedpath));
		await writeFile(join(srcpath, nestedpath, filename), '');

		await copy(srcpath, destpath);

		const exists = await pathExists(join(destpath, nestedpath, filename));

		expect(exists).to.be.true;
	});

	it('copies filtered entities (function)', async () => {
		const srcpath = join(rootpath, 'src');
		const destpath = join(rootpath, 'dest');
		const badfilename = 'bad-file.ext';
		const goodfilename = 'good-file.ext';

		function filter(src) {
			return src.indexOf('bad') === -1;
		}

		await mkdirs(srcpath);
		await writeFile(join(srcpath, badfilename), '');
		await writeFile(join(srcpath, goodfilename), '');

		await copy(srcpath, destpath, filter);

		const badExists = await pathExists(join(destpath, badfilename));
		const goodExists = await pathExists(join(destpath, goodfilename));

		expect(badExists).to.be.false;
		expect(goodExists).to.be.true;
	});

	it('copies filtered entities (regexp)', async () => {
		const srcpath = join(rootpath, 'src');
		const destpath = join(rootpath, 'dest');
		const badfilename = 'bad-file.ext';
		const goodfilename = 'good-file.ext';

		const filter = /^((?!bad).)*$/;

		await mkdirs(srcpath);
		await writeFile(join(srcpath, badfilename), '');
		await writeFile(join(srcpath, goodfilename), '');

		await copy(srcpath, destpath, filter);

		const badExists = await pathExists(join(destpath, badfilename));
		const goodExists = await pathExists(join(destpath, goodfilename));

		expect(badExists).to.be.false;
		expect(goodExists).to.be.true;
	});

	it('copies only files and folders', async () => {
		const srcpath = join(rootpath, 'src');
		const srcsymlinkpath = join(srcpath, 'src-symlink');
		const destpath = join(rootpath, 'dest');
		const destsymlinkpath = join(destpath, 'src-symlink');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await symlink('../', srcsymlinkpath);

		await copy(srcpath, destpath);

		const symlinkExists = await pathExists(destsymlinkpath);

		expect(symlinkExists).to.be.false;
	});

	describe('throws if', () => {
		it('"src" is not a string', async () => {
			async function fail() {
				await copy(null, 'temp');
			}

			return expect(fail()).be.rejected;
		});

		it('"dest" is not a string', async () => {
			async function fail() {
				await copy('src', null);
			}

			return expect(fail()).be.rejected;
		});

		it('"src" and "dest" are the same', async () => {
			async function fail() {
				await copy('path', 'path');
			}

			return expect(fail()).be.rejected;
		});

		it('"filter" is not a function nor regexp', async () => {
			async function fail() {
				await copy('src', 'path', null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
