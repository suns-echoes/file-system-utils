import fs from 'fs';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const mkdir = promisify(fs.mkdir);


async function _createFolder(path) {
	const pathParts = path.split(/\\|\//g);
	let pathToCheck = '';

	do {
		pathToCheck += pathParts.shift() + '/';

		try {
			const stat = await lstat(pathToCheck);

			if (!stat.isDirectory()) {
				throw new Error(`Entity is not directory, '${pathToCheck}'`);
			}
		}
		catch (_) {
			await mkdir(pathToCheck);
		}
	} while (pathParts.length);
}


/**
 * Method creates single folder or nested folders according to given path.
 * @async @method createFolder
 * @param {string} path - path to create
 * @returns {Promise} - the promise of folder creation
 */
export async function createFolder(path) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	return await _createFolder(path);
}
