import { lstat, readdir } from 'fs/promises';
import { join, resolve } from 'path';

interface ListFilesOptions {
	/**
	 * Returns absolute paths. Default is "false".
	 */
	absolutePaths?: boolean,
	/**
	 * The maximum scan depth. Default is "-1" (no limit).
	 */
	depth?: number,
	/**
	 * The optional regular expression or function to test if file should be
	 * listed.
	 */
	filter?: Filter,
}

const listFilesDefaults: ListFilesOptions = {
	absolutePaths: false,
	depth:         -1,
};

async function _listFiles(
	path: string, depth: number, filter: FilterFunction | null, fileList: string[],
): Promise<void> {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile() && (!filter || filter(subpath, false))) {
			fileList.push(subpath);
		}
		else if (stat.isDirectory()) {
			if (depth !== 0) {
				await _listFiles(subpath, depth - 1, filter, fileList);
			}
		}
	}
}

/**
 * Lists all files in provided path, including subfolders.
 * @param path The string path.
 * @param options The optional object with additional options.
 * @returns The promise of list.
 */
export async function listFiles(path: string, options?: ListFilesOptions): Promise<string[]> {
	if (typeof path !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	if (options !== undefined && !(options instanceof Object)) {
		throw new TypeError('"options" is not an object');
	}

	const { absolutePaths, depth, filter } = { ...listFilesDefaults, ...options };
	let rootPath = path;

	if (typeof absolutePaths === 'boolean') {
		if (absolutePaths) {
			rootPath = resolve(path);
		}
	}
	else {
		throw new TypeError('"options.absolutePaths" is not a boolean');
	}

	if (typeof depth !== 'number' || depth !== Math.floor(depth)) {
		throw new TypeError('"options.depth" is not an integer');
	}

	const listFilter = filter instanceof RegExp
		? (currentSrc: string): boolean => filter.test(currentSrc)
		: (typeof filter === 'function' ? <FilterFunction>filter : null);

	const fileList: string[] = [];

	await _listFiles(rootPath, depth, listFilter, fileList);

	return fileList;
}
