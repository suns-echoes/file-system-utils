import { lstat } from 'fs/promises';

/**
 * Checks if entity with given path is folder.
 * @param path The string path.
 * @returns The promise of check.
 */
export async function isFolder(path: string): Promise<boolean> {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	try {
		return (await lstat(path)).isDirectory();
	}
	catch {
		return false;
	}
}
