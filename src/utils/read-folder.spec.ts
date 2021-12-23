import { symlink, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

import { mkdirs, remove } from 'fs-extra';

import { readFolder } from './read-folder';

describe('readFolder', () => {
	const rootpath = join('temp', '.spec');

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('returns list of files and folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath);

		expect(entries).to.be.eql({
			files: [
				filepath1,
				filepath2,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('returns list of files and folders with depth = 0', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { depth: 0 });

		expect(entries).to.be.eql({
			files: [
				filepath1,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('returns list of files and folders with absolute paths', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { absolutePaths: true });

		expect(entries).to.be.eql({
			files: [
				resolve(filepath1),
				resolve(filepath2),
			],
			folders: [
				resolve(subfolderpath),
			],
		});
	});

	it('returns filtered list of files and folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');
		const badsubfolderpath = join(rootpath, 'subfolder_bad');

		await mkdirs(subfolderpath);
		await mkdirs(badsubfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2_bad.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { filter: (path) => path.indexOf('bad') === -1 });

		expect(entries).to.be.eql({
			files: [
				filepath1,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('returns filtered (regexp) list of files and folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');
		const badsubfolderpath = join(rootpath, 'subfolder_bad');

		await mkdirs(subfolderpath);
		await mkdirs(badsubfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2_bad.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { filter: /^((?!bad).)*$/ });

		expect(entries).to.be.eql({
			files: [
				filepath1,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('returns list of files', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { includeFolders: false });

		expect(entries).to.be.eql({
			files: [
				filepath1,
				filepath2,
			],
			folders: null,
		});
	});

	it('returns list of folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entries = await readFolder(rootpath, { includeFiles: false });

		expect(entries).to.be.eql({
			files:   null,
			folders: [
				subfolderpath,
			],
		});
	});

	it('skips symlinks', async () => {
		const filepath = join(rootpath, 'file.ext');
		const symlinkpath = join(rootpath, 'symlink');

		await writeFile(filepath, '');
		await symlink(filepath, symlinkpath);

		const fileList = await readFolder(rootpath);

		expect(fileList).to.be.eql({
			files: [
				filepath,
			],
			folders: [],
		});
	});

	it('returnss null if specified path is not a folder', async () => {
		const filepath = join(rootpath, 'file.ext');

		await writeFile(filepath, '');

		const fileList = await readFolder(filepath);

		return expect(fileList).to.be.null;
	});

	it('returnss null if specified path does not exist', async () => {
		const fileList = await readFolder('i_dont_exist');

		return expect(fileList).to.be.null;
	});

	it('throws if "path" is not a string', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder(null);
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options" is not an object', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', null);
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options.depth" is not a number', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', { depth: null });
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options.depth" is not an integer', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', { depth: 3.3 });
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options.absolutePaths" is not a number', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', { absolutePaths: null });
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options.includeFiles" is not a number', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', { includeFiles: null });
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "options.includeFolders" is not a number', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readFolder('.', { includeFolders: null });
		};

		return expect(fail()).to.be.rejected;
	});
});
