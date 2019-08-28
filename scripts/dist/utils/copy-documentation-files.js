const { join } = require('path');

const { copy } = require('fs-extra');

import { config } from '../config.js';


export async function copyDocumentationFiles() {
	await copy('README.md', join(config.paths.dist, 'README.md'));
	await copy(config.paths.docs.input, config.paths.docs.output);
}
