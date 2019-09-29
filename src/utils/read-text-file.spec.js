import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { mkdirs, remove } from 'fs-extra';

import { readTextFile } from './read-text-file';


const writeFile = promisify(fs.writeFile);


describe('readTextFile', () => {
	const rootpath = join('temp', '.spec');

	beforeEach(async () => {
		await mkdirs(rootpath);
	});

	afterEach(async () => {
		await remove(rootpath);
	});

	it('reads content from file', async () => {
		const filepath = join(rootpath, 'file.txt');
		const content = 'test 123';

		await writeFile(filepath, content, { encoding: 'utf8' });

		const fileContent = await readTextFile(filepath);

		expect(fileContent).to.eql(content);
	});

	it('returns "undefined" if file does not exist', async () => {
		const filepath = 'path/to/nowhere';
		const content = undefined;

		const fileContent = await readTextFile(filepath);

		expect(fileContent).to.eql(content);
	});

	describe('throws if', () => {
		it('"path" is not a string', async () => {
			async function fail() {
				await readTextFile(null);
			}

			return expect(fail()).be.rejected;
		});

		it('entity is not a file', async () => {
			async function fail() {
				await readTextFile('.');
			}

			return expect(fail()).be.rejected;
		});
	});
});
