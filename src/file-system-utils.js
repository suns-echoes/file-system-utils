'use strict';

const { copy } = require('./utils/copy.js');
const { createFolder } = require('./utils/create-folder.js');
const { isFile } = require('./utils/is-file.js');
const { isFolder } = require('./utils/is-folder.js');
const { listFiles } = require('./utils/list-files.js');
const { readJSONFile } = require('./utils/read-json-file.js');
const { readTextFile } = require('./utils/read-text-file.js');
const { remove } = require('./utils/remove.js');
const { writeJSONFile } = require('./utils/write-json-file.js');
const { writeTextFile } = require('./utils/write-text-file.js');


module.exports.FileSystemUtils = {
	copy,
	createFolder,
	isFile,
	isFolder,
	listFiles,
	readJSONFile,
	readTextFile,
	remove,
	writeJSONFile,
	writeTextFile,
};
