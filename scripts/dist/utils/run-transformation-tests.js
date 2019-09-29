import { exec } from '@suns-echoes/exec/src/exec';


export async function runTransformationTests() {
	const { code, output } = await exec('npm', ['run', 'test:dist']);

	if (code !== 0) {
		throw output;
	}
}
