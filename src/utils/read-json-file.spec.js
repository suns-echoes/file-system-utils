const { mkdirs, writeJson, remove } = require('fs-extra');

import { readJSONFile } from './read-json-file.js';


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
		const data = undefined;

		const fileData = await readJSONFile(filepath);

		expect(fileData).to.eql(data);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await readJSONFile(null);
			}

			return expect(fail()).be.rejected;
		});

		it('entity is not a file', async () => {
			async function fail() {
				await readJSONFile('.');
			}

			return expect(fail()).be.rejected;
		});
	});
});
