import { copyFile, lstat, readdir } from 'fs/promises';
import { basename, join } from 'path';

import { createFolder } from './create-folder';
import { isFile } from './is-file';
import { isFolder } from './is-folder';

async function _copy(src: string, dest: string, filter?: FilterFunction): Promise<void> {
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
 * Copies file or folder with it's content.
 * @param src The string source path.
 * @param dest The string destination path.
 * @param filter The regular expression or function to test if file or folder should be processed.
 * @returns The promise of copy.
 */
export async function copy(src: string, dest: string, filter?: Filter): Promise<void> {
	if (src === dest) {
		throw new Error('"src" and "dest" cannot point to the same location');
	}

	const isSrcFile = await isFile(src);
	const isDestFolder = await isFolder(dest);

	const copyDest = isSrcFile && isDestFolder ? join(dest, basename(src)) : dest;
	const copyFilter = filter instanceof RegExp
		? (currentSrc: string): boolean => filter.test(currentSrc)
		: (typeof filter === 'function' ? <FilterFunction>filter : undefined);

	await _copy(src, copyDest, copyFilter);
}
