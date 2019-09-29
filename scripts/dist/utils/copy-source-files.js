import { copy } from 'fs-extra';

import { config } from '../config';


export async function copySourceFiles() {
	await copy(config.paths.src.input, config.paths.src.output);
}
