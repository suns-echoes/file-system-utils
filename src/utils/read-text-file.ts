import { readFile } from 'fs/promises';

/**
 * Reads text file and returns promise which resolves with file content.
 * @param filepath The string file path.
 * @param encoding The content encoding. Default is 'utf8'.
 * @returns Promise of file content.
 */
export async function readTextFile(filepath: string, encoding: BufferEncoding = 'utf8'): Promise<string | undefined> {
	if (typeof filepath !== 'string') {
		throw new TypeError('"filepath" is not a string');
	}

	try {
		return await readFile(filepath, { encoding });
	}
	catch {}

	return undefined;
}
