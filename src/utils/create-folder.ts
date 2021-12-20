import { lstat, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Creates single folder or nested folders according to given path.
 * @param path The string path to be created.
 * @returns The promise of folder create.
 */
export async function createFolder(path: string): Promise<void> {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	const pathParts = path.split(/\\|\//g);
	const partCount = pathParts.length;
	let pathToCheck = '';

	for (let index = 0; index < partCount; index++) {
		pathToCheck = join(pathToCheck, pathParts[index]);

		try {
			const stat = await lstat(pathToCheck);

			if (!stat.isDirectory()) {
				throw new Error(`Entity is not directory, "${pathToCheck}"`);
			}
		}
		catch (_) {
			await mkdir(pathToCheck);
		}
	}
}
