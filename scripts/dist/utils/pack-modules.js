const { rollup } = require('rollup');

import { config } from '../config.js';


const inputOptions = {
	input: config.paths.main.input,
	treeshake: true,
};

const outputOptions = {
	compact: true,
	file: config.paths.main.output,
	format: 'cjs',
};


export async function packModules() {
	const bundle = await rollup(inputOptions);

	await bundle.write(outputOptions);
}
