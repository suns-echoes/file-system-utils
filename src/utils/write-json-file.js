const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

import { createFolder } from './create-folder.js';


const writeFile = promisify(fs.writeFile);


async function _writeJSONFile(filepath, data, replacer, space) {
	const jsonString = JSON.stringify(data, replacer, space);
	const path = dirname(filepath);

	await createFolder(path);
	await writeFile(filepath, jsonString, { encoding: 'utf8' });
}


/**
 * Method serialize given data and writes it in JSON format to file.
 * @async @method writeJSONFile
 * @param {string} filepath - file path
 * @param {object} data - data to write to file
 * @param {function} [replacer] - optional, replacer function for JSON stringify
 * @param {string} [space] - optional, indent space for JSON stringify
 * @returns {Promise}
 */
export async function writeJSONFile(filepath, data, replacer, space) {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _writeJSONFile(filepath, data, replacer, space);
}
