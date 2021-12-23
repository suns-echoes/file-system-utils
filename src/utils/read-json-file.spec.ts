import { mkdirs, writeJson, remove } from 'fs-extra';

import { readJSONFile } from './read-json-file';


describe('readJSONFile', () => {
	const rootpath = 'temp/.spec';

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('reads JSON data from file', async () => {
		const filepath = `${rootpath}/file.json`;
		const data = { test: 123 };

		await writeJson(filepath, data);

		const fileData = await readJSONFile(filepath);

		expect(fileData).to.eql(data);
	});

	it('returns "undefined" if file does not exist', async () => {
		const filepath = 'path/to/nowhere';

		const fileData = await readJSONFile(filepath);

		expect(fileData).to.be.undefined;
	});

	it('throws if "filepath" is not a string', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readJSONFile(null);
		};

		return expect(fail()).to.be.rejected;
	});
});
