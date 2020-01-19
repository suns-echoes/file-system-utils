import fs from 'fs';
import { join, resolve } from 'path';
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
 * @param {object} options - additional options
 *   @prop {boolean} [absolutePaths=false] - return absolute paths
 *   @prop {number} [depth=-1] - maximum subfolders scan depth
 *   @prop {function|regexp} [filter] - copy if function or regexp test returns true
 * @returns {Promise} - the promise of list
 */
export async function listFiles(path, options = {}) {
	if (typeof path !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	if (options !== undefined && !(options instanceof Object)) {
		throw new TypeError('"options" is not an object');
	}

	const {
		absolutePaths = false,
		depth = -1,
		filter,
	} = options;

	let rootPath = path;
	let scanFilter = filter;

	if (typeof absolutePaths === 'boolean') {
		if (absolutePaths) {
			rootPath = resolve(path);
		}
	}
	else {
		throw new TypeError('"options.absolutePaths" is not a boolean');
	}

	if (typeof depth !== 'number') {
		throw new TypeError('"options.depth" is not a number');
	}

	if (filter !== undefined) {
		if (filter instanceof RegExp) {
			scanFilter = (src) => filter.test(src);
		}
		else if (typeof filter !== 'function') {
			throw new TypeError('"options.filter" is not a function nor regexp');
		}
	}

	return await _listFiles(rootPath, depth, scanFilter);
}
