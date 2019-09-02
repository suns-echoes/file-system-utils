const { remove } = require('fs-extra');

const { config } = require('../config.js');


module.exports.cleanup = async function () {
	await remove(config.paths.dist);
};
