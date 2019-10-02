import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function _listFiles(path, depth, filter, _fileList = []) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile() && (!filter || filter(subpath))) {
			_fileList.push(subpath);
		}
		else if (stat.isDirectory()) {
			if (depth !== 0) {
				await _listFiles(subpath, depth - 1, filter, _fileList);
			}
		}
	}

	return _fileList;
}


/**
 * Method lists all files in provided path and it's subfolders.
 * @async @method listFiles
 * @param {string} path - path to folder
 * @param {number} [depth=-1] - maximum subfolders scan depth
 * @param {function|regexp} [filter] - copy if function or regexp test returns true
 * @returns {Promise} - the promise of list
 */
export async function listFiles(path, depth = -1, filter) {
	let listFilter = filter;

	if (typeof path !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	if (filter !== undefined) {
		if (filter instanceof RegExp) {
			listFilter = (src) => filter.test(src);
		}
		else if (typeof filter !== 'function') {
			throw new TypeError('"filter" is not a function nor regexp');
		}
	}

	return await _listFiles(path, depth, listFilter);
}
