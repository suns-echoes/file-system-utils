const { exec } = require('@suns-echoes/exec/src/exec.js');


module.exports.runTests = async function () {
	const { code, output } = await exec('npm', ['run', 'coverage']);

	if (code !== 0) {
		throw output;
	}
};
