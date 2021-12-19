import { lstat } from 'fs/promises';

/**
 * Checks if entity with given path is folder.
 * @param path The string path.
 * @returns The promise of check.
 */
export async function isFolder(path: string): Promise<boolean> {
	try {
		return (await lstat(path)).isDirectory();
	}
	catch {
		return false;
	}
}
