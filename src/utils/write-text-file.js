import fs from 'fs';
import { dirname } from 'path';
import { promisify } from 'util';

import { createFolder } from './create-folder';


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
export async function writeTextFile(filepath, content, encoding) {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _writeTextFile(filepath, content, encoding);
}
