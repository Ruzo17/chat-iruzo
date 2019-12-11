const { app, BrowserWindow } = require('electron')

let win

function createWindow () {
  win = new BrowserWindow({
    width: 800,
    height: 535,
    webPreferences: {
      nodeIntegration: true
    }
  })
  win.setMenu(null);
  
  var log4js = require('log4js');
  var logger = log4js.getLogger('['+process.pid+'] ' + require('path').basename(__filename).split(".")[0]);
  logger.level = 'debug';
  logger.debug(arguments.callee.name, '... ');
  
  win.loadFile('src/gui/view/console.html');
  
    win.webContents.openDevTools();
  
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