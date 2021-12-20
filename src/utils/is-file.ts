import { lstat } from 'fs/promises';

/**
 * Checks if entity with given path is file.
 * @param path The string path.
 * @returns The promise of check.
 */
export async function isFile(path: string): Promise<boolean> {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	try {
		return (await lstat(path)).isFile();
	}
	catch (error) {
		return false;
	}
}
