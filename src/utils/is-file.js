'use strict';

const fs = require('fs');
const { promisify } = require('util');


const lstat = promisify(fs.lstat);


async function _isFile(path) {
	try {
		const stat = await lstat(path);

		return stat.isFile();
	}
	catch {
		return false;
	}
}


/**
 * Method checks if entity with given path is file.
 * @async @method isFile
 * @param {string} path - entity path
 * @returns {Promise} - the promise of check
 */
module.exports.isFile = async function (path) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	return await _isFile(path);
};
