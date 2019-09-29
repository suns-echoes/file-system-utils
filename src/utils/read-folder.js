import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function _readFolder(path, depth, incFiles, incFolders, entityList) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isDirectory()) {
			if (incFolders) {
				entityList.folders.push(subpath);
			}

			if (depth !== 0) {
				await _readFolder(subpath, depth - 1, incFiles, incFolders, entityList);
			}
		}
		else if (stat.isFile()) {
			if (incFiles) {
				entityList.files.push(subpath);
			}
		}
	}

	return entityList;
}


/**
 * Method lists all files and folder in provided path and it's subfolders.
 * @async @method readFolder
 * @param {string} path - path to folder
 * @param {number} [depth=-1] - maximum subfolders scan depth
 * @param {object} [options] - additional options
 * @param {boolean} [options.incFiles=true] - include files
 * @param {boolean} [options.incFolders=true] - include folders
 * @returns {Promise} - the promise of list
 */
export async function readFolder(path, depth = -1, options = {}) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	if (typeof depth !== 'number') {
		throw new TypeError('"depth" is not a number');
	}

	if (!(options instanceof Object)) {
		throw new TypeError('"options" is not an object');
	}

	const {
		incFiles = true,
		incFolders = true,
	} = options;

	const stat = await lstat(path);
	const entityList = {
		files: incFiles ? [] : null,
		folders: incFolders ? [] : null,
	};

	if (stat.isDirectory()) {
		return await _readFolder(path, depth, incFiles, incFolders, entityList);
	}
	else {
		throw new Error('the specified path is not a folder');
	}
}
