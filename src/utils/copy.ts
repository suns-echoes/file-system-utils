import { constants } from 'fs';
import { copyFile, lstat, readdir } from 'fs/promises';
import { basename, join } from 'path';

import { createFolder } from './create-folder';
import { isFile } from './is-file';
import { isFolder } from './is-folder';

async function _copy(src: string, dest: string, filter: FilterFunction | null, flags: number): Promise<void> {
	const srcStat = await lstat(src);

	if (srcStat.isDirectory()) {
		const entities = await readdir(src);

		await createFolder(dest);

		for (const entity of entities) {
			const srcsubpath = join(src, entity);
			const destsubpath = join(dest, entity);

			if (!filter || filter(srcsubpath, (await lstat(srcsubpath)).isDirectory())) {
				await _copy(srcsubpath, destsubpath, filter, flags);
			}
		}
	}
	else if (srcStat.isFile()) {
		let allowCopy = true;

		try {
			if (flags !== 0) {
				await lstat(dest);
				allowCopy = false;
			}
		}
		catch {}

		if (allowCopy) {
			await copyFile(src, dest, flags);
		}
	}
}

/**
 * Copies file or folder with it's content.
 * @param src The string source path.
 * @param dest The string destination path.
 * @param overwrite The optional boolean indicating if existing files should be
 * overwritten. True by default.
 * @returns The promise of copy.
 */
export async function copy(src: string, dest: string, overwrite?: boolean): Promise<void>;
/**
 * Copies file or folder with it's content.
 * @param src The string source path.
 * @param dest The string destination path.
 * @param filter The optional regular expression or function to test if file or
 * folder should be processed.
 * @param overwrite The optional boolean indicating if existing files should be
 * overwritten.
 * @returns The promise of copy.
 */
export async function copy(src: string, dest: string, filter?: Filter, overwrite?: boolean): Promise<void>;
export async function copy(src: string, dest: string, filterMaybe?: Filter | boolean, overwriteMaybe = true): Promise<void> {
	if (typeof src !== 'string') {
		throw new TypeError('"src" is not a string');
	}

	if (typeof dest !== 'string') {
		throw new TypeError('"dest" is not a string');
	}

	if (src === dest) {
		throw new Error('"src" and "dest" cannot point to the same location');
	}

	const filter = typeof filterMaybe !== 'boolean' ? filterMaybe : undefined;
	const overwrite = typeof filterMaybe === 'boolean' ? filterMaybe : overwriteMaybe;

	const isSrcFile = await isFile(src);
	const isDestFolder = await isFolder(dest);

	const copyDest = isSrcFile && isDestFolder ? join(dest, basename(src)) : dest;
	const copyFilter = filter instanceof RegExp
		? (currentSrc: string): boolean => filter.test(currentSrc)
		: (typeof filter === 'function' ? <FilterFunction>filter : null);

	await _copy(src, copyDest, copyFilter, overwrite ? 0 : constants.COPYFILE_EXCL);
}
