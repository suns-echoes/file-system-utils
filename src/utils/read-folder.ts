import { lstat, readdir } from 'fs/promises';
import { join, resolve } from 'path';

interface ReadFolderEntries {
	files: string[] | null,
	folders: string[] | null,
}

interface ReadFolderOptions {
	/**
	 * Returns absolute paths. Default is "false".
	 */
	absolutePaths?: boolean,
	/**
	 * The maximum scan depth. Default is "-1" (no limit).
	 */
	depth?: number,
	/**
	 * Include files. Default is "true".
	 */
	includeFiles?: boolean,
	/**
	 * Include folders. Default is "true".
	 */
	includeFolders?: boolean,
	/**
	 * The optional regular expression or function to test if file should be
	 * listed.
	 */
	filter?: Filter,
}

const readFolderDefaults: ReadFolderOptions = {
	absolutePaths:  false,
	depth:          -1,
	includeFiles:   true,
	includeFolders: true,
};

async function _readFolder(path: string, depth: number, filter: FilterFunction | null, entries: ReadFolderEntries): Promise<void> {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isDirectory() && (!filter || filter(subpath, true))) {
			entries.folders?.push(subpath);

			if (depth !== 0) {
				await _readFolder(subpath, depth - 1, filter, entries);
			}
		}
		else if (stat.isFile() && (!filter || filter(subpath, false))) {
			entries.files?.push(subpath);
		}
	}
}

/**
 * Lists all files and folder in provided path and it's subfolders.
 * @param path The string path.
 * @param options The optional object with additional options.
 * @returns The promise of list.
 */
export async function readFolder(path: string, options?: ReadFolderOptions): Promise<ReadFolderEntries | null> {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	if (options !== undefined && !(options instanceof Object)) {
		throw new TypeError('"options" is not an object');
	}

	const { absolutePaths, depth, includeFiles, includeFolders, filter } = { ...readFolderDefaults, ...options };
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

	if (typeof includeFiles !== 'boolean') {
		throw new TypeError('"options.includeFiles" is not a boolean');
	}

	if (typeof includeFolders !== 'boolean') {
		throw new TypeError('"options.includeFolders" is not a boolean');
	}

	const readFilter = filter instanceof RegExp
		? (currentSrc: string): boolean => filter.test(currentSrc)
		: (typeof filter === 'function' ? <FilterFunction>filter : null);

	try {
		const entries: ReadFolderEntries = {
			files:   includeFiles ? [] : null,
			folders: includeFolders ? [] : null,
		};

		if ((await lstat(path)).isDirectory()) {
			await _readFolder(rootPath, depth, readFilter, entries);

			return entries;
		}
	}
	catch {}

	return null;
}
