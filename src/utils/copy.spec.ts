import { readFile, symlink, writeFile } from 'fs/promises';
import { join } from 'path';

import { pathExists, mkdirs, remove } from 'fs-extra';

import { copy } from './copy';

describe('copy', () => {
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

	it('copies file with new name', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destpath = join(rootpath, 'dest');
		const destfilepath = join(rootpath, 'dest/file-copy.ext');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await writeFile(srcfilepath, '');

		await copy(srcfilepath, destfilepath, false);

		const exists = await pathExists(destfilepath);

		expect(exists).to.be.true;
	});

	it('doesn\'t copy file if target already exists', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destpath = join(rootpath, 'dest');
		const destfilepath = join(rootpath, 'dest/file.ext');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await writeFile(srcfilepath, '1');
		await writeFile(destfilepath, '2');

		await copy(srcfilepath, destfilepath, false);

		const targetFileContents = await readFile(destfilepath, 'utf8');
		const exists = await pathExists(destfilepath);

		expect(targetFileContents).to.be.equal('2');
		expect(exists).to.be.true;
	});

	it('overwrites existing target file', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destpath = join(rootpath, 'dest');
		const destfilepath = join(rootpath, 'dest/file.ext');

		await mkdirs(srcpath);
		await mkdirs(destpath);
		await writeFile(srcfilepath, '1');
		await writeFile(destfilepath, '2');

		await copy(srcfilepath, destfilepath);

		const targetFileContents = await readFile(destfilepath, 'utf8');
		const exists = await pathExists(destfilepath);

		expect(targetFileContents).to.be.equal('1');
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

		const filter = (src: string): boolean => {
			return src.indexOf('bad') === -1;
		};

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

	it('throws if copy file to destination containing folder with the same name as dest file', async () => {
		const srcpath = join(rootpath, 'src');
		const srcfilepath = join(rootpath, 'src/file.ext');
		const destfolderpath = join(rootpath, 'dest/file.ext');
		const destfilepath = join(rootpath, 'dest');

		await mkdirs(srcpath);
		await mkdirs(destfolderpath);
		await writeFile(srcfilepath, '');

		const fail = async (): Promise<void> => {
			await copy(srcfilepath, destfilepath);
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "src" is not a string', async () => {
		const fail = async (): Promise<void> => {
			// @ts-ignore
			await copy(null, 'path');
		};

		return expect(fail()).be.rejected;
	});

	it('throws if "dest" is not a string', async () => {
		const fail = async (): Promise<void> => {
			// @ts-ignore
			await copy('path', null);
		};

		return expect(fail()).be.rejected;
	});

	it('throws if "src" and "dest" are the same', async () => {
		const fail = async (): Promise<void> => {
			await copy('path', 'path');
		};

		return expect(fail()).be.rejected;
	});
});
