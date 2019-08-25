import { cleanup } from './utils/cleanup.js';
import { createPackageFile } from './utils/create-package-file.js';
import { packModules } from './utils/pack-modules.js';
import { copySourceFiles } from './utils/copy-source-files.js';
import { copyDocumentationFiles } from './utils/copy-documentation-files.js';


export const dist = {
	cleanup,
	createPackageFile,
	packModules,
	copySourceFiles,
	copyDocumentationFiles,
};
