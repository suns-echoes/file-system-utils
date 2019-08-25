const fs = require('fs');
const { promisify } = require('util');


const lstat = promisify(fs.lstat);


async function _isFile(path) {
	try {
		const stat = await lstat(path);

		return stat.isFile();
	}
	catch {
		return false;
	}
}


export async function isFile(path) {
	if (typeof path !== 'string') {
		throw new TypeError('"path" is not a string');
	}

	return await _isFile(path);
}
