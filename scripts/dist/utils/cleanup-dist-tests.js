import { removeSpecFiles } from './utils/remove-spec-files';

import { config } from '../config';


export async function cleanupDistTests() {
	await removeSpecFiles(config.paths.dist);
}
