const { rollup } = require('rollup');

const { config } = require('../config.js');


const inputOptions = {
	input: config.paths.main.input,
	treeshake: true,
};

const outputOptions = {
	compact: true,
	file: config.paths.main.output,
	format: 'cjs',
};


module.exports.packModules = async function () {
	const bundle = await rollup(inputOptions);

	await bundle.write(outputOptions);
};
