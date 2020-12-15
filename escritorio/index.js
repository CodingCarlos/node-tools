const { app, BrowserWindow, ipcMain } = require('electron');
const { commands, run } = require('./commands');

let mainWindow;

/**
 *	Create the default app window
 */
function createWindow() {
	mainWindow = new BrowserWindow({
		width: 400,
		height: 450,
		webPreferences: {
			contextIsolation: false,
			nodeIntegration: true,
		},
	});

	mainWindow.loadFile('www/index.html');
}

// Start app
app.on('ready', createWindow);

// Event handeling 
ipcMain.on('start', (event, arg) => {
	event.sender.send('status', 'starting');

	let com;
	switch (arg) {
		case 'cam':
			com = run(commands.cam);
			break;

		case 'midi':
			com = run(commands.midi);
			break;

		default:
			Object.keys(commands).forEach((command) => {
				com = run(commands[command]);
			});
	}

	com.then(() => event.sender.send('status', 'started'))
		.catch(console.error);
});

ipcMain.on('stop', (event, arg) => {
	event.sender.send('status', 'stopping');

	let com;
	switch (arg) {
		case 'cam':
			com = stopCam();
			break;

		case 'midi':
			com = stopMidi();
			break;

		default:
			com = Promise.all([
				stopCam(),
				stopMidi(),
			]);
	}

	com.then(() => event.sender.send('status', 'all-stopped'))
		.catch((e) => {
			console.error(e);
		});
});

process.on('unhandledRejection', (reason) => {
  console.warn(reason);
});

// Internal functions 

function stopCam() {
	return run("ps -ef | awk '/[d]roidcam/{print $2}'")
		.then(killPidString);
}

function stopMidi() {
	return run("ps -ef | awk '/[m]idi-bind-streaming/{print $2}'")
		.then(killPidString);
}

function killPidString(data) {
	const pids = data.trim().split('\n');
	const proc = [];
	pids.forEach((pid) => {
		proc.push(run(`kill ${pid}`));
	})
	
	return Promise.all(proc);
}
