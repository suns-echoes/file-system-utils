import { copy } from './utils/copy';
import { createFolder } from './utils/create-folder';
import { isFile } from './utils/is-file';
import { isFolder } from './utils/is-folder';
import { listFiles } from './utils/list-files';
import { readFolder } from './utils/read-folder';
import { readJSONFile } from './utils/read-json-file';
import { readTextFile } from './utils/read-text-file';
import { remove } from './utils/remove';
import { writeJSONFile } from './utils/write-json-file';
import { writeTextFile } from './utils/write-text-file';


export const FileSystemUtils = {
	copy,
	createFolder,
	isFile,
	isFolder,
	listFiles,
	readFolder,
	readJSONFile,
	readTextFile,
	remove,
	writeJSONFile,
	writeTextFile,
};
