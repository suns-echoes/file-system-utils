import { hints } from './utils/hints';
import { runLinter } from './utils/run-linter';
import { runTests } from './utils/run-tests';
import { cleanup } from './utils/cleanup';
import { createPackageFile } from './utils/create-package-file';
import { packModules } from './utils/pack-modules';
import { copySourceFiles } from './utils/copy-source-files';
import { transformModulesIntoCJS } from './utils/transform-modules-into-cjs';
import { runTransformationTests } from './utils/run-transformation-tests';
import { cleanupDistTests } from './utils/cleanup-dist-tests';
import { copyDocumentationFiles } from './utils/copy-documentation-files';


export const dist = {
	hints,
	runLinter,
	runTests,
	cleanup,
	createPackageFile,
	packModules,
	copySourceFiles,
	transformModulesIntoCJS,
	runTransformationTests,
	cleanupDistTests,
	copyDocumentationFiles,
};
