import { constants } from 'fs';
import { copyFile, lstat, mkdir, readdir, rename } from 'fs/promises';
import { basename, dirname, join, normalize } from 'path';

// -----------------------------------------------------------------------------
/**
 * The object with details of failed operation.
 */
interface CopyError {
	/**
	 * The "src" input.
	 */
	src?: string,
	/**
	 * The "dest" input.
	 */
	dest?: string,
	/**
	 * The error object with error code and message.
	 */
	error: any,
}

interface TransactionRegisterEntry {
	type: 'copyFile' | 'mkdir' | 'rename',
	args: any[],
}

interface TransactionRegister {
	/**
	 * List of changes made to file system.
	 */
	entries: TransactionRegisterEntry[],
	/**
	 * List of backup files to be removed after successful copy.
	 */
	cleanup: string[],
}

interface CopyInternalOptions {
	filter: FilterFunction | null,
	overwriteDest: boolean,
	mirrorMode: boolean,
	/**
	 * Allowed to throw errors.
	 */
	throws: boolean,
	/**
	 * Breaks on error.
	 */
	breakOnError: boolean,
	timeout: number,
	signal: AbortSignal | undefined,
	errors: CopyError[],
	transactionRegister: TransactionRegister | null,
}

interface FSEntityInfo {
	isDirectory: boolean,
	isFile: boolean,
	exists: boolean,
}

function generateRandomHash(radix = 36): string {
	const date = Date.now();
	const dateL = date % 0x7FFFFFFF;
	const dateH = (date - dateL) / 0x7FFFFFFF;

	const random = Math.floor((Math.random() * radix ** 7 * (radix - 1) - 1) + radix ** 6);
	const randomL = random % 0x7FFFFFFF;
	const randomH = (random - randomL) / 0x7FFFFFFF;

	return ((dateH ^ randomH) * 0x7FFFFFFF + (dateL ^ randomL)).toString(radix);
}

async function getEntityInfo(path: string): Promise<FSEntityInfo> {
	try {
		const stat = await lstat(path);

		return {
			exists:      true,
			isDirectory: stat.isDirectory(),
			isFile:      stat.isFile(),
		};
	}
	catch {}

	return {
		exists:      false,
		isDirectory: false,
		isFile:      false,
	};
}

async function isDirectory(path: string): Promise<boolean> {
	try {
		return (await lstat(path)).isDirectory();
	}
	catch {}

	return false;
}

async function tryMakeDirectory(path: string, options: CopyInternalOptions): Promise<boolean> {
	try {
		await mkdir(path);

		options.transactionRegister?.entries.push({ type: 'mkdir', args: [path] });

		return true;
	}
	catch (error) {
		if ((<NodeFSError>error).code === 'EEXIST' && await isDirectory(path)) {
			return true;
		}

		options.errors.push({ dest: path, error });

		if (options.throws) {
			throw error;
		}
	}

	return false;
}

async function tryMakeDestDirectory(path: string, options: CopyInternalOptions): Promise<void> {
	const pathParts = path.split(/[\\/]/g);
	const partCount = pathParts.length;
	let currentPath = '.';

	for (let index = 0; index < partCount; index++) {
		currentPath = normalize(join(currentPath, pathParts[index]));

		if (!await tryMakeDirectory(path, options) && options.breakOnError) {
			return;
		}
	}
}

async function tryRenameOriginalFile(path: string, existingNames: string[], options: CopyInternalOptions): Promise<boolean> {
	// Find safe backup name
	const dir = dirname(path);
	let safeName = `${basename(path)}.bak`;
	let retry = 100;

	for (; retry >= 0; --retry) {
		const randomHash = `{{${Date.now().toString(36)}+${Math.floor(Math.random() * 36 ** 3 * 35 + 36 ** 3).toString(36)}}}`;

		safeName = `${basename(path)}.${randomHash}.bak`;

		if (!existingNames.includes(safeName)) {
			break;
		}
	}

	if (retry === -1 && options.throws) {
		throw new Error('Could not rename file');
	}

	existingNames.push(safeName);

	const safeBackupPath = join(dir, safeName);

	await rename(path, safeBackupPath);
}

async function tryCopyFile(src: string, dest: string, options: CopyInternalOptions): Promise<boolean> {
	try {
		if (options.transactionRegister) {
			await tryRenameOriginalFile(dest, options);
		}

		await copyFile(src, dest, options.overwriteDest ? 0 : constants.COPYFILE_EXCL);

		options.transactionRegister?.entries.push({ type: 'copyFile', args: [src, dest] });

		return true;
	}
	catch (error) {
		options.errors.push({ src, dest, error });

		if (options.throws) {
			throw error;
		}
	}

	return false;
}

async function tryCopyDirectory(src: string, dest: string, options: CopyInternalOptions): Promise<void> {
	try {
		const entities = await readdir(src, { withFileTypes: true });
		const entityCount = entities.length;

		for (let index = 0; index < entityCount; index++) {
			const entity = entities[index];
			const entityPath = join(src, entity.name);
			const destPath = join(dest, entity.name);

			if (entity.isFile()) {
				if (!tryCopyFile(entityPath, destPath, options)) {
					if (options.breakOnError) {
						return;
					}
				}
			}
			else if (entity.isDirectory()) {
				if (!tryMakeDirectory(destPath, options)) {
					if (options.breakOnError) {
						return;
					}
				}
			}
		}
	}
	catch (error) {
		options.errors.push({ src, dest, error });

		if (options.throws) {
			throw error;
		}
	}
}

async function transactionFinish(dest: string, transactionRegister: TransactionRegister): Promise<void> {

}

async function transactionRevert(dest: string, transactionRegister: TransactionRegister): Promise<void> {

}

// -----------------------------------------------------------------------------
/**
 * Possible options for copy method.
 */
interface CopyOptions {
	/**
	 * The filter function or regular expression. Current entity will be copied
	 * if test returns "true", otherwise file or whole directory will be skipped.
	 * Default is unset.
	 */
	filter?: Filter,
	/**
	 * Maximum depth of recursive copy.
	 * Default is "-1" (no limit).
	 */
	depth?: number,
	/**
	 * Overwrite existing files at target location if set to "true", otherwise
	 * skip those files.
	 * Default is "false".
	 */
	overwriteDest?: boolean,
	/**
	 * Create mirror copy if set to "true", otherwise perform regular copy.
	 * Mirror copy will remove all existing files and directories from
	 * destination. Requires "overwriteDest" set to "true".
	 * Default is "false".
	 */
	mirrorMode?: boolean,
	/**
	 * Revert all changes on "dest" when any operation fails if set to "true",
	 * otherwise leave it as is. This will ignore "continueOnError" option.
	 * Default is "false".
	 */
	transactionMode?: boolean,
	/**
	 * Ignore current error and continue with queued tasks if set to "true",
	 * otherwise end the whole process.
	 * Default is "false".
	 */
	continueOnError?: boolean,
	/**
	 * Suppress all errors if set to "true", otherwise throw errors.
	 * Default is "false".
	 */
	silentFail?: boolean,
	/**
	 * Abort operation if not completed in given time in miliseconds. Disabled
	 * if set to "0".
	 * Default is "0".
	 */
	timeout?: number,
	/**
	 * Signal allowing to abort in-progress operation.
	 */
	signal?: AbortSignal,
}

/**
 * Default options for copy method.
 */
const copyOptionsDefaults: CopyOptions = {
	filter:          undefined,
	depth:           -1,
	overwriteDest:   false,
	mirrorMode:      false,
	transactionMode: false,
	continueOnError: false,
	silentFail:      false,
	timeout:         0,
	signal:          undefined,
};

// -----------------------------------------------------------------------------
/**
 * Copies file or directory with it's content.
 * @param src The string source path.
 * @param dest The string destination path.
 * @param options The object with options.
 * @returns The promise that resolves to "true" on success, "false" otherwise.
 */
export async function copy(src: string, dest: string, options?: CopyOptions): Promise<CopyError[] | null> {
	const srcPath = normalize(src);
	const srcEntity = await getEntityInfo(srcPath);

	const destPath = normalize(dest);

	const copyOptions = { ...copyOptionsDefaults, ...options };

	const errors: CopyError[] = [];
	const transactionRegister: TransactionRegister | null = copyOptions.transactionMode
		? { entries: [], cleanup: [] } : null;

	try {
		if (srcPath === destPath) {
			throw new Error('"src" and "dest" cannot point to the same location');
		}

		const destEntity = await getEntityInfo(destPath);

		const internalOptions: CopyInternalOptions = {
			filter: copyOptions.filter instanceof RegExp
				? (currentSrc: string): boolean => (<RegExp>copyOptions.filter).test(currentSrc)
				: <FilterFunction | null>copyOptions.filter,
			overwriteDest: copyOptions.overwriteDest!,
			mirrorMode:    copyOptions.mirrorMode! && copyOptions.overwriteDest!,
			throws:        copyOptions.transactionMode! || !copyOptions.silentFail && !copyOptions.continueOnError,
			breakOnError:  !copyOptions.continueOnError && !copyOptions.transactionMode,
			timeout:       copyOptions.timeout!,
			signal:        copyOptions.signal,
			errors,
			transactionRegister,
		};

		if (!destEntity.exists) {
			await tryMakeDestDirectory(destPath, internalOptions);
		}
		else if (!destEntity.isDirectory) {
			throw new Error('"dest" already exists but it\'s not a directory');
		}

		if (srcEntity.isFile) {
			await tryCopyFile(srcPath, join(destPath, basename(srcPath)), internalOptions);
		}
		else if (srcEntity.isDirectory) {
			await tryCopyDirectory(srcPath, destPath, internalOptions);
		}
		else {
			throw new Error('"src" is neither a file path nor a directory path');
		}

		if (copyOptions.transactionMode) {
			transactionFinish(destPath, transactionRegister!);
		}
	}
	catch (error) {
		if (copyOptions.transactionMode) {
			transactionRevert(destPath, transactionRegister!);
		}

		if (!copyOptions.silentFail) {
			throw error;
		}
	}

	return errors.length ? errors : null;
}
