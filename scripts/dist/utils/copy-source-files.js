const { copy } = require('fs-extra');

const { config } = require('../config.js');


const isFolder = (src) => (/(?:^|[\\/])[^\\/.]+$/.test(src));
const isJSFile = (src) => (/\.js$/.test(src));
const isSpecFile = (src) => (/\.spec\.js$/.test(src));


const filter = (src) => {
	if (isFolder(src) || isJSFile(src) && !isSpecFile(src)) {
		return true;
	}
	else {
		return false;
	}
};


module.exports.copySourceFiles = async function () {
	await copy(config.paths.src.input, config.paths.src.output, { filter });
};
