import { copy } from 'fs-extra';

import { config } from '../config.js';


export async function copyDocumentationFiles() {
	return await copy(config.paths.docs.input, config.paths.docs.output);
}
