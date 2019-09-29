import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function _listFiles(path, depth, fileList) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile()) {
			fileList.push(subpath);
		}
		else if (stat.isDirectory()) {
			if (depth !== 0) {
				await _listFiles(subpath, depth - 1, fileList);
			}
		}
	}

	return fileList;
}


/**
 * Method lists all files in provided path and it's subfolders.
 * @async @method listFiles
 * @param {string} path - path to folder
 * @param {number} [depth=-1] - maximum subfolders scan depth
 * @returns {Promise} - the promise of list
 */
export async function listFiles(path, depth = -1) {
	if (typeof path !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _listFiles(path, depth, []);
}
