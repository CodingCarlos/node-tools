const { exec } = require("child_process");

// const command = "ls -la";
// const command = "npm run cam";
// run(command);

const commands = [
	"npm run cam",
	"npm run midi",
];

commands.forEach((command) => {
	let proc = run(command);
	console.log(proc.pid)
});

function run(command) {
	return exec(command, (error, stdout, stderr) => {
	    if (error) {
	        console.error(`error: ${error.message}`);
	        return;
	    }
	    if (stderr) {
	        console.error(`stderr: ${stderr}`);
	        return;
	    }

	    console.log(`stdout: ${stdout}`);
	});
}