import { writeFile } from 'fs/promises';
import { join } from 'path';

import { mkdirs, remove } from 'fs-extra';

import { readTextFile } from './read-text-file';

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

		const fileContent = await readTextFile(filepath);

		expect(fileContent).to.be.undefined;
	});

	it('throws if "filepath" is not a string', async () => {
		const fail = async (): Promise<any> => {
			// @ts-ignore
			await readTextFile(null);
		};

		return expect(fail()).to.be.rejected;
	});
});
