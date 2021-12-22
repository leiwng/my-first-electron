const { app, BrowserWindow, globalShortcut } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    // transparent: true,
    // frame: false,
    // resizable: false,
    // maximizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {

  //Register a 'ctrl+shift+i' shortcut listener.
  const ret = globalShortcut.register('ctrl+shift+i', () => {
    console.log('ctrl+shift+i is pressed');
  });

  if (!ret) {
    console.log('Check whether a shortcut is registered: ' + globalShortcut.isRegistered('ctrl+shift+i'));
  }

  console.log('')

  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregister('ctrl+shift+i');
    app.quit();
  }
});


