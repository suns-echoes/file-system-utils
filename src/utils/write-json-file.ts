import { writeFile } from 'fs/promises';
import { dirname } from 'path';

import { createFolder } from './create-folder';

/**
 * Method serialize given data and writes it in JSON format to file.
 * @async @method writeJSONFile
 * @param {string} filepath - file path
 * @param {object} data - data to write to file
 * @param {function} [replacer] - replacer function for JSON stringify
 * @param {string} [space] - indent space for JSON stringify
 * @returns {Promise}
 */
export async function writeJSONFile(
	filepath: string, data: any, replacer?: ((this: any, key: string, value: any) => any), space?: string | number,
): Promise<boolean> {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	try {
		await createFolder(dirname(filepath));
		await writeFile(filepath, JSON.stringify(data, replacer, space), { encoding: 'utf8' });

		return true;
	}
	catch {}

	return false;
}
