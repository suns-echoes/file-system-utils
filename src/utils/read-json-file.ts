import { readFile } from 'fs/promises';

/**
 * Reads JSON file and returns promise which resolves with parsed data.
 * @param filepath The string file path.
 * @returns Parsed JSON object.
 */
export async function readJSONFile(filepath: string): Promise<any> {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	try {
		return JSON.parse(await readFile(filepath, { encoding: 'utf8' }));
	}
	catch {}

	return undefined;
}
