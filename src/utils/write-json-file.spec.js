import { mkdirs, readJson, remove } from 'fs-extra';

import { writeJSONFile } from './write-json-file';


describe('writeJSONFile', () => {
	const rootpath = 'temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('writes data to JSON file', async () => {
		const filepath = `${rootpath}/file.json`;
		const data = { test: 123 };

		await mkdirs(rootpath);
		await writeJSONFile(filepath, data);

		const fileData = await readJson(filepath);

		expect(fileData).to.eql(data);
	});

	it('writes data to non existing path', async () => {
		const filepath = `${rootpath}/non/existing/path/file.json`;
		const data = { test: 123 };

		await mkdirs(rootpath);
		await writeJSONFile(filepath, data);

		const fileData = await readJson(filepath);

		expect(fileData).to.eql(data);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await writeJSONFile(null);
			}

			return expect(fail()).to.be.rejected;
		});
	});
});
