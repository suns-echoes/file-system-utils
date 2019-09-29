import fs from 'fs';
import { basename, join } from 'path';
import { promisify } from 'util';

import { createFolder } from './create-folder';
import { isFile } from './is-file';
import { isFolder } from './is-folder';


const copyFile = promisify(fs.copyFile);
const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


async function _copy(src, dest, filter) {
	const srcStat = await lstat(src);

	if (srcStat.isDirectory()) {
		const entities = await readdir(src);

		await createFolder(dest);

		for (const entity of entities) {
			const srcsubpath = join(src, entity);
			const destsubpath = join(dest, entity);

			if (!filter || filter(srcsubpath, destsubpath)) {
				await _copy(srcsubpath, destsubpath, filter);
			}
		}
	}
	else if (srcStat.isFile()) {
		await copyFile(src, dest);
	}
}


/**
 * Method copies file or folder with it's content.
 * @async @method copy
 * @param {string} src - source path
 * @param {string} dest - destination path
 * @param {function|regexp} [filter] - copy if function or regexp test returns true
 * @returns {Promise} - the promise of copy
 */
export async function copy(src, dest, filter) {
	let copyDest = dest;
	let copyFilter = filter;

	if (typeof src !== 'string') {
		throw new TypeError('"src" is not a string');
	}

	if (typeof dest !== 'string') {
		throw new TypeError('"dest" is not a string');
	}

	if (src === dest) {
		throw new Error('"src" and "dest" cannot be the same location');
	}

	if (filter !== undefined) {
		if (filter instanceof RegExp) {
			copyFilter = (src) => filter.test(src);
		}
		else if (typeof filter !== 'function') {
			throw new TypeError('"filter" is not a function nor regexp');
		}
	}

	const isSrcFile = await isFile(src);
	const isDestFolder = await isFolder(dest);

	if (isSrcFile && isDestFolder) {
		copyDest = join(copyDest, basename(src));
	}

	await _copy(src, copyDest, copyFilter);
}
