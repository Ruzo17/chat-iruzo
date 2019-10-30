var serverApi = require('./src/server/api/api.js');

var logger = log4js.getLogger(require('path').basename(__filename).split(".")[0]);

const { app, BrowserWindow } = require('electron')

let win

function createWindow () {
  logger.debug(arguments.callee.name);
  win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })
  
  var log4js = require('log4js');
  var logger = log4js.getLogger();
  logger.debug('aaaaaaa');

  serverApi.init();

  win.loadFile('src/gui/view/console.html');

//   win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})