import { remove } from 'fs-extra';

import { config } from '../config';


export async function cleanup() {
	await remove(config.paths.dist);
}
