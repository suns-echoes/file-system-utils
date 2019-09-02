const { join } = require('path');

const { copy } = require('fs-extra');

const { config } = require('../config.js');


module.exports.copyDocumentationFiles = async function () {
	await copy('README.md', join(config.paths.dist, 'README.md'));
	await copy(config.paths.docs.input, config.paths.docs.output);
};
