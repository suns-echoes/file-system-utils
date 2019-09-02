const { runLinter } = require('./utils/run-linter.js');
const { runTests } = require('./utils/run-tests.js');
const { cleanup } = require('./utils/cleanup.js');
const { createPackageFile } = require('./utils/create-package-file.js');
const { packModules } = require('./utils/pack-modules.js');
const { copySourceFiles } = require('./utils/copy-source-files.js');
const { copyDocumentationFiles } = require('./utils/copy-documentation-files.js');


module.exports.dist = {
	runLinter,
	runTests,
	cleanup,
	createPackageFile,
	packModules,
	copySourceFiles,
	copyDocumentationFiles,
};
