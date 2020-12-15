const { exec } = require("child_process");

const commands = {
	cam: "npm run cam",
	midi: "npm run midi",
};

function run(command) {
	return new Promise((resolve, reject) => {
		exec(command, (error, stdout, stderr) => {
		    if (error) {
		        return reject(error);
		    }
		    if (stderr) {
		        return reject(new Error(stderr));
		    }

		    return resolve(stdout);
		});
	});
}

module.exports = {
	commands,
	run
}
