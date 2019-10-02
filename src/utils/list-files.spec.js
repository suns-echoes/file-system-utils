import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { mkdirs, remove } from 'fs-extra';

import { listFiles } from './list-files';


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

	it('lists filtered entities (function)', async () => {
		const path = join(rootpath, 'src');
		const badfilename = 'bad-file.ext';
		const badFilePath = join(path, badfilename);
		const goodfilename = 'good-file.ext';
		const goodFilePath = join(path, goodfilename);

		function filter(path) {
			return path.indexOf('bad') === -1;
		}

		await mkdirs(path);
		await writeFile(badFilePath, '');
		await writeFile(goodFilePath, '');

		const fileList = await listFiles(path, -1, filter);

		expect(fileList).to.be.eql([goodFilePath]);
	});

	it('lists filtered entities (regexp)', async () => {
		const path = join(rootpath, 'src');
		const badfilename = 'bad-file.ext';
		const badFilePath = join(path, badfilename);
		const goodfilename = 'good-file.ext';
		const goodFilePath = join(path, goodfilename);

		const filter = /^((?!bad).)*$/;

		await mkdirs(path);
		await writeFile(badFilePath, '');
		await writeFile(goodFilePath, '');

		const fileList = await listFiles(path, -1, filter);

		expect(fileList).to.be.eql([goodFilePath]);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await listFiles(null);
			}

			return expect(fail()).be.rejected;
		});

		it('"filter" is not a function nor regexp', async () => {
			async function fail() {
				await listFiles('path', -1, null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
