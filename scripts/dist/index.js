import { dist } from './dist';


async function runDist() {
	/* eslint-disable no-console */

	console.log('');
	console.log('PREPARING DISTRIBUTION FILES');
	console.log('');

	dist.hints();

	console.log(' - Run linter');
	await dist.runLinter();

	console.log(' - Run tests and coverage');
	await dist.runTests();

	console.log(' - Cleanup dist folder');
	await dist.cleanup();

	console.log(' - Copy source files');
	await dist.copySourceFiles();

	console.log(' - Transform source files to CommonJS');
	await dist.transformModulesIntoCJS();

	console.log(' - Run transformation tests');
	await dist.runTransformationTests();

	console.log(' - Cleanup dist tests');
	await dist.cleanupDistTests();

	console.log(' - Copy documentation files');
	await dist.copyDocumentationFiles();

	console.log(' - Pack modules (prepare main dist file)');
	await dist.packModules();

	console.log(' - Create package file');
	await dist.createPackageFile();

	console.log('');

	/* eslint-enable no-console */
}


runDist();
