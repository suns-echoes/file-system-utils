const fs = require('fs');
const { promisify } = require('util');


const lstat = promisify(fs.lstat);


async function _isFolder(path) {
	try {
		const stat = await lstat(path);

		return stat.isDirectory();
	}
	catch {
		return false;
	}
}


/**
 * Checks if entity is folder
 * @async @method isFolder
 * @param {string} path - entity path
 * @returns {Promise} - the promise of check
 */
export async function isFolder(path) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	return await _isFolder(path);
}
