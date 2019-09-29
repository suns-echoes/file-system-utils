import fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';


const lstat = promisify(fs.lstat);
const readdir = promisify(fs.readdir);


export async function findSourceFiles(path, fileList = []) {
	const entities = await readdir(path);

	for (const entity of entities) {
		const subpath = join(path, entity);
		const stat = await lstat(subpath);

		if (stat.isFile() && /\.js$/.test(subpath)) {
			fileList.push(subpath);
		}
		else if (stat.isDirectory()) {
			await findSourceFiles(subpath, fileList);
		}
	}

	return fileList;
}
