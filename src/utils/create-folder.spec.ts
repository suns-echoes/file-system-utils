import { mkdirs, pathExists, remove, writeJson } from 'fs-extra';

import { createFolder } from './create-folder';

describe('createFolder', () => {
	const rootpath = 'temp/.spec';

	before(async () => {
		await remove(rootpath);
	});

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

		const fail = async (): Promise<void> => {
			await mkdirs(failDirpath);
			await writeJson(filepath, {});

			await createFolder(dirpath);
		};

		return expect(fail()).to.be.rejected;
	});

	it('throws if "path" is not a string', async () => {
		const fail = async (): Promise<void> => {
			// @ts-ignore
			await createFolder(null);
		};

		return expect(fail()).to.be.rejected;
	});
});
