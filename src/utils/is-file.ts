import { lstat } from 'fs/promises';

/**
 * Checks if entity with given path is file.
 * @param path The string path.
 * @returns The promise of check.
 */
export async function isFile(path: string): Promise<boolean> {
	try {
		return (await lstat(path)).isFile();
	}
	catch {
		return false;
	}
}
