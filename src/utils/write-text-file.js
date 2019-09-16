'use strict';

const fs = require('fs');
const { dirname } = require('path');
const { promisify } = require('util');

const { createFolder } = require('./create-folder.js');


const writeFile = promisify(fs.writeFile);


async function _writeTextFile(filepath, content, encoding) {
	const path = dirname(filepath);

	await createFolder(path);
	await writeFile(filepath, content, { encoding });
}


/**
 * Method writes string to file.
 * @async @method writeTextFile
 * @param {string} filepath - file path
 * @param {string} content - content to write to file
 * @param {string} [encoding='utf8'] - content encoding
 * @returns {Promise}
 */
module.exports.writeTextFile = async function (filepath, content, encoding) {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _writeTextFile(filepath, content, encoding);
};
