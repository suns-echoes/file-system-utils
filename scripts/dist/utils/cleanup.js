import { remove } from 'fs-extra';

import { config } from '../config.js';


export async function cleanup() {
	return await remove(config.paths.dist);
}
