// const { ipcRenderer } = require('electron');
const electron = require('electron');
const ipc = electron.ipcRenderer
console.log(ipc);

// Async message handler
ipc.on('status', (event, arg) => {
   console.log(arg);
});

function start(what) {
    ipc.send('start', what);
}

function stop(what) {
    ipc.send('stop', what);
}