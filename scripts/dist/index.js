/* eslint-disable no-console */
import { dist } from './dist.js';


async function runDist() {
	console.log('');
	console.log('PREPARING DISTRIBUTION FILES');
	console.log('');

	console.log(' - Run linter');
	await dist.runLinter();

	console.log(' - Run tests');
	await dist.runTests();

	console.log(' - Cleanup dist folder');
	await dist.cleanup();

	console.log(' - Pack modules');
	await dist.packModules();

	console.log(' - Create package file');
	await dist.createPackageFile();

	console.log(' - Copy source files');
	await dist.copySourceFiles();

	console.log(' - Copy documentation files');
	await dist.copyDocumentationFiles();

	console.log('');
}


runDist();
