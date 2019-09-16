'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

const { mkdirs, remove } = require('fs-extra');

const { writeTextFile } = require('./write-text-file.js');


const readFile = promisify(fs.readFile);


describe('writeTextFile', () => {
	const rootpath = join('temp', '.spec');

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('writes content file', async () => {
		const filepath = `${rootpath}/file.txt`;
		const content = 'test 123';

		await mkdirs(rootpath);
		await writeTextFile(filepath, content);

		const fileContent = await readFile(filepath, { encoding: 'utf8' });

		expect(fileContent).to.eql(content);
	});

	it('writes data to non existing path', async () => {
		const filepath = `${rootpath}/non/existing/path/file.txt`;
		const content = 'test 123';

		await mkdirs(rootpath);
		await writeTextFile(filepath, content);

		const fileContent = await readFile(filepath, { encoding: 'utf8' });

		expect(fileContent).to.eql(content);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await writeTextFile(null);
			}

			return expect(fail()).be.rejected;
		});
	});
});
