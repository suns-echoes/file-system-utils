import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);
const unlink = promisify(fs.unlink);


export async function removeSpecFiles(path) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile() && /\.spec\.js$/.test(subpath)) {
			await unlink(subpath);
		}
		else if (stat.isDirectory()) {
			await removeSpecFiles(subpath);
		}
	}
}
