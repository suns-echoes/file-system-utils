const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function _listFiles(path, filelist) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile()) {
			filelist.push(subpath);
		}
		else if (stat.isDirectory()) {
			await _listFiles(subpath, filelist);
		}
	}

	return filelist;
}


/**
 * Method list all files in given folder and subfolders.
 * @async @method listFiles
 * @param {string} path - path to list
 * @returns {Promise} - the promise of list
 */
export async function listFiles(path) {
	if (typeof path !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	const filelist = [];

	return _listFiles(path, filelist);
}
