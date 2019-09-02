const { exec } = require('@suns-echoes/exec/src/exec.js');


module.exports.runLinter = async function () {
	const { code, output } = await exec('npm', ['run', 'lint']);

	if (code !== 0) {
		throw output;
	}
};
