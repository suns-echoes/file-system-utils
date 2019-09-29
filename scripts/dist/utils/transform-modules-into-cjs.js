import { readFile, writeFile } from 'fs';

import { transformESMIntoCJS } from '@suns-echoes/transform-esm-into-cjs';

import { findSourceFiles } from './utils/find-source-files';

import { config } from '../config';


export async function transformModulesIntoCJS() {
	const distPath = config.paths.dist;

	const files = await findSourceFiles(distPath);

	for (const filepath of files) {
		let source = await readFile(filepath, { encoding: 'utf8' });

		source = transformESMIntoCJS(source);

		await writeFile(filepath, source, { encoding: 'utf8' });
	}
}
