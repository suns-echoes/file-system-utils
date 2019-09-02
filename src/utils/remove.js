'use strict';

const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);


async function _remove(path) {
	try {
		const stat = await lstat(path);

		if (stat.isDirectory()) {
			const entities = await readdir(path);

			for (const entity of entities) {
				const subpath = join(path, entity);

				await _remove(subpath);
			}

			await rmdir(path);
		}
		else {
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
 * @returns {void}
 */
module.exports.remove = async function (path) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	return await _remove(path);
};
