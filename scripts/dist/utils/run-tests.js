import { exec } from '@suns-echoes/exec/src/exec.js';


export async function runTests() {
	const { code, output } = await exec('npm', ['run', 'test']);

	if (code !== 0) {
		throw output;
	}
}
