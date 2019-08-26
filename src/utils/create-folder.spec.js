const { mkdirs, pathExists, remove, writeJson } = require('fs-extra');

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

import { createFolder } from './create-folder.js';


chai.use(chaiAsPromised);


describe('createFolder', () => {
	const rootpath = 'temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('creates folder', async () => {
		const dirpath = `${rootpath}/create-folder`;

		await createFolder(dirpath);

		const exists = await pathExists(dirpath);

		expect(exists).to.be.true;
	});

	it('creates nested folders', async () => {
		const dirpath = `${rootpath}/create-folder/with/nested/sub/folders`;

		await createFolder(dirpath);

		const exists = await pathExists(dirpath);

		expect(exists).to.be.true;
	});

	it('fails if path is file', () => {
		const dirpath = `${rootpath}/create-folder/with/nested/sub/folders`;
		const failDirpath = `${rootpath}/create-folder/with`;
		const filepath = `${rootpath}/create-folder/with/nested`;

		async function fail() {
			await mkdirs(failDirpath);
			await writeJson(filepath, {});

			await createFolder(dirpath);
		}

		return expect(fail()).be.rejected;
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await createFolder(null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
