import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { mkdirs, remove } from 'fs-extra';

import { readFolder } from './read-folder';


const symlink = promisify(fs.symlink);
const writeFile = promisify(fs.writeFile);


describe('readFolder', () => {
	const rootpath = join('temp', '.spec');

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('return list of files and folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entityList = await readFolder(rootpath);

		expect(entityList).to.be.eql({
			files: [
				filepath1,
				filepath2,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('return list of files and folders with depth = 0', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entityList = await readFolder(rootpath, 0);

		expect(entityList).to.be.eql({
			files: [
				filepath1,
			],
			folders: [
				subfolderpath,
			],
		});
	});

	it('return list of files', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entityList = await readFolder(rootpath, -1, { incFolders: false });

		expect(entityList).to.be.eql({
			files: [
				filepath1,
				filepath2,
			],
			folders: null,
		});
	});

	it('return list of folders', async () => {
		const subfolderpath = join(rootpath, 'subfolder');

		await mkdirs(subfolderpath);

		const filepath1 = join(rootpath, 'file1.ext');
		const filepath2 = join(subfolderpath, 'file2.ext');

		await writeFile(filepath1, '');
		await writeFile(filepath2, '');

		const entityList = await readFolder(rootpath, -1, { incFiles: false });

		expect(entityList).to.be.eql({
			files: null,
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

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await readFolder(null);
			}

			return expect(fail()).be.rejected;
		});

		it('"depth" is not a number', async () => {
			async function fail() {
				await readFolder('.', null);
			}

			return expect(fail()).be.rejected;
		});

		it('"options" is not an object', async () => {
			async function fail() {
				await readFolder('.', -1, null);
			}

			return expect(fail()).be.rejected;
		});

		it('specified path is not a folder', async () => {
			const filepath = join(rootpath, 'file.ext');

			await writeFile(filepath, '');

			async function fail() {
				await readFolder(filepath);
			}

			return expect(fail()).be.rejected;
		});

		it('path does not exists', async () => {
			async function fail() {
				await readFolder('path_to_nowhere');
			}

			return expect(fail()).be.rejected;
		});
	});
});
