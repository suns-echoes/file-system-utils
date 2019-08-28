import { exec } from '@suns-echoes/exec/src/exec.js';


export async function runLinter() {
	const { code, output } = await exec('npm', ['run', 'lint']);

	if (code !== 0) {
		throw output;
	}
}
