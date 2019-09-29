import fs from 'fs';
import { promisify } from 'util';


const readFile = promisify(fs.readFile);


async function _readTextFile(filepath, encoding) {
	try {
		const fileContent = await readFile(filepath, { encoding });

		return fileContent;
	}
	catch (error) {
		const { code } = error;

		if (code === 'ENOENT') {
			return undefined;
		}
		else {
			throw error;
		}
	}
}


/**
 * Method reads text file and returns promise which resolves with file content.
 * @async @method readTextFile
 * @param {string} filepath - file path
 * @param {string} [encoding='utf8'] - content encoding
 * @returns {string} - file content
 */
export async function readTextFile(filepath, encoding = 'utf8') {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _readTextFile(filepath, encoding);
}
