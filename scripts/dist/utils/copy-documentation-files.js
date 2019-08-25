import { join } from 'path';

import { copy } from 'fs-extra';

import { config } from '../config.js';


export async function copyDocumentationFiles() {
	await copy('README.md', join(config.paths.dist, 'README.md'));
	await copy(config.paths.docs.input, config.paths.docs.output);
}
