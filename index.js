const {
    app,
    BrowserWindow,
    ipcMain: ipc,
    globalShortcut: gs,
  } = require('electron'),
  fs = require('fs'),
  path = require('path'),
  express = require('express');

exp = express();
exp.use(express.json());
exp.use(express.static('./public'));
exp.get('/', (_, res) => {
  res.sendFile('./public/index.html');
});
const server = exp.listen(40072, () =>
  console.log('Internal server running...')
);

class MODAnime {
  constructor() {
    let modanime = new BrowserWindow({
      backgroundColor: '#1a202c',
      icon: path.join(__dirname, './public/logo.png'),
      width: 800,
      height: 600,
      minWidth: 600,
      minHeight: 600,
      show: false,
      frame: false,
      webPreferences: {
        nodeIntegration: false,
        contextIsolation: true,
        enableRemoteModule: false,
        preload: path.join(__dirname, './preload.js'),
      },
    });
    modanime.setMenu(null);
    modanime.loadURL('http://localhost:40072');
    this.modanime = modanime;
  }
  minimize() {
    this.modanime.minimize();
  }
  resize() {
    if (this.modanime.isMaximized()) this.modanime.unmaximize();
    else this.modanime.maximize();
  }
  destroy() {
    this.modanime.destroy();
  }
  restore() {
    this.modanime.restore();
  }
  ready(func) {
    this.modanime.once('ready-to-show', () => {
      this.modanime.show();
      func();
    });
  }
}

app.whenReady().then(() => {
  const modanime = new MODAnime();

  gs.register('CommandOrControl+Shift+C', () => {
    modanime.destroy();
    server.close();
    app.quit();
  });
  gs.register('CommandOrControl+Shift+M', () => modanime.minimize());
  gs.register('CommandOrControl+Shift+N', () => modanime.restore());
  gs.register('CommandOrControl+Shift+R', () => modanime.resize());

  modanime.ready(() => {
    ipc.on('titlebar', (_, arg) => {
      if (arg === 'destroy') {
        modanime.destroy();
        server.close();
        app.quit();
      } else if (arg === 'minimize') modanime.minimize();
      else if (arg === 'resize') modanime.resize();
    });
  });
});

app.on('window-all-closed', () => {
  server.close();
  app.quit();
});
