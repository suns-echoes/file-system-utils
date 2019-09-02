const { copy } = require('fs-extra');

const { config } = require('../config.js');


const filter = (src) => {
	return !(/\.(example|spec)\.js$/.test(src));
};


module.exports.copySourceFiles = async function () {
	await copy(config.paths.src.input, config.paths.src.output, { filter });
};
