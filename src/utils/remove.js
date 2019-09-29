import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);


async function _remove(path, filter) {
	try {
		const stat = await lstat(path);

		if (stat.isDirectory()) {
			const entities = await readdir(path);

			for (const entity of entities) {
				const subpath = join(path, entity);

				await _remove(subpath, filter);
			}

			if (!filter || filter(path)) {
				await rmdir(path);
			}
		}
		else if (!filter || filter(path)) {
			await unlink(path);
		}
	}
	catch (error) {
		const { code } = error;

		if (code !== 'ENOENT') {
			throw error;
		}
	}
}


/**
 * Method removes file or folder with it's content.
 * @async @method remove
 * @param {string} path - path to remove
 * @param {function|regexp} [filter] - remove if function or regexp test returns true
 * @returns {void}
 */
export async function remove(path, filter) {
	let removeFilter = filter;

	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	if (filter !== undefined) {
		if (filter instanceof RegExp) {
			removeFilter = (src) => filter.test(src);
		}
		else if (typeof filter !== 'function') {
			throw new TypeError('"filter" is not a function nor regexp');
		}
	}

	return await _remove(path, removeFilter);
}
