import { rollup } from 'rollup';
import minify from 'rollup-plugin-babel-minify';

import { config } from '../config';


const plugins = [
	minify(config.rollup.plugins.minify),
];

const inputOptions = {
	input: config.paths.main.input,
	plugins,
	treeshake: true,
};

const outputOptions = {
	compact: true,
	file: config.paths.main.output,
	format: 'esm',
};


export async function packModules() {
	const bundle = await rollup(inputOptions);

	await bundle.write(outputOptions);
}
