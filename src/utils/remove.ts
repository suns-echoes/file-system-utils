import { lstat, readdir, rmdir, unlink } from 'fs/promises';
import { join } from 'path';

async function _remove(path: string, filter: FilterFunction | null): Promise<void> {
	try {
		const stat = await lstat(path);

		if (stat.isDirectory()) {
			const entities = await readdir(path);

			for (const entity of entities) {
				const subpath = join(path, entity);

				await _remove(subpath, filter);
			}

			if (!filter || filter(path, true)) {
				await rmdir(path);
			}
		}
		else if (!filter || filter(path, false)) {
			await unlink(path);
		}
	}
	catch (error) {
		const { code } = <TryCatchError>error;

		if (code !== 'ENOENT') {
			throw error;
		}
	}
}

/**
 * Removes file or folder with it's content.
 * @param path The string path to remove.
 * @param filter The optional regular expression or function to test if file or
 * folder should be removed.
 * @returns {void}
 */
export async function remove(path: string, filter?: Filter): Promise<void> {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	const removeFilter = filter instanceof RegExp
		? (currentSrc: string): boolean => filter.test(currentSrc)
		: (typeof filter === 'function' ? <FilterFunction>filter : null);

	await _remove(path, removeFilter);
}
