import { runLinter } from './utils/run-linter.js';
import { runTests } from './utils/run-tests.js';
import { cleanup } from './utils/cleanup.js';
import { createPackageFile } from './utils/create-package-file.js';
import { packModules } from './utils/pack-modules.js';
import { copySourceFiles } from './utils/copy-source-files.js';
import { copyDocumentationFiles } from './utils/copy-documentation-files.js';


export const dist = {
	runLinter,
	runTests,
	cleanup,
	createPackageFile,
	packModules,
	copySourceFiles,
	copyDocumentationFiles,
};
