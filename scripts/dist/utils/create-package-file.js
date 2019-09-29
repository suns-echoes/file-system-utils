import fs from 'fs';
import { promisify } from 'util';

import { config } from '../config';


const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);


const whitelist = [
	'name',
	'main',
	'version',
	'description',
	'homepage',
	'repository',
	'author',
	'license',
	'dependencies',
];


export async function createPackageFile() {
	const pkgFile = await readFile('./package.json', 'utf8');
	const pkg = JSON.parse(pkgFile);

	Object.keys(pkg).forEach((key) => {
		if (!whitelist.includes(key)) {
			pkg[key] = undefined;
		}
	});

	const data = JSON.stringify(pkg, null, '  ');

	await writeFile(`${config.paths.dist}/package.json`, data, { encoding: 'utf8' });
}
