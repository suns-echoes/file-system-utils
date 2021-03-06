import fs from 'fs';
import { promisify } from 'util';


const readFile = promisify(fs.readFile);


async function _readJSONFile(filepath) {
	try {
		const fileContent = await readFile(filepath, { encoding: 'utf8' });
		const jsonData = JSON.parse(fileContent);

		return jsonData;
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
 * Method reads JSON file and returns promise which resolves with parsed data.
 * @async @method readJSONFile
 * @param {string} filepath - file path
 * @returns {object} - parsed JSON object
 */
export async function readJSONFile(filepath) {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	return await _readJSONFile(filepath);
}
