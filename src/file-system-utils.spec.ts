import { readdir } from 'fs/promises';

import { FileSystemUtils } from './file-system-utils';

async function findMethods(): Promise<string[]> {
	const entities = await readdir('./src/utils');
	const matchNonSpecFiles = /^((?!\.spec\.js).)*\.js$/;
	const methods: string[] = [];

	for (const entity of entities) {
		if (matchNonSpecFiles.test(entity)) {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const module = require(`./utils/${entity}`);
			const keys = Object.keys(module);

			keys.forEach((key) => {
				if (typeof module[key] === 'function') {
					methods.push(key);
				}
				else {
					throw new Error(`"${entity}" module exports entity "${key}" that is not a function`);
				}
			});
		}
	}

	return methods;
}

describe('FileSystemUtils', () => {
	it('exports all existing methods', async () => {
		const exportedMethods = Object.keys(FileSystemUtils);
		const foundMethods = await findMethods();

		expect(exportedMethods).to.be.eql(foundMethods);
	});
});
