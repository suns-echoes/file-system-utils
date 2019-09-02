import { copy } from './utils/copy.js';
import { createFolder } from './utils/create-folder.js';
import { isFile } from './utils/is-file.js';
import { isFolder } from './utils/is-folder.js';
import { listFiles } from './utils/list-files.js';
import { readJSONFile } from './utils/read-json-file.js';
import { remove } from './utils/remove.js';
import { writeJSONFile } from './utils/write-json-file.js';


export const FileSystemUtils = {
	copy,
	createFolder,
	isFile,
	isFolder,
	listFiles,
	readJSONFile,
	remove,
	writeJSONFile,
};
