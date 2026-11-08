const { app, BrowserWindow, nativeTheme } = require('electron');
const url = require('url');
const path = require('path');

function createMainWindow() {

    nativeTheme.themeSource = 'dark';

    const mainWindow = new BrowserWindow({
        title: 'FlowList',
        width: 1100,
        height: 700,
        minWidth: 950,
        minHeight: 600,
        resizable: true,
        // Icone do projeto
        icon: path.join(__dirname, 'assents/images/icon.png'),
        autoHideMenuBar: true,
        webPreferences: {
            // Preload: ponte segura entre a página e o Electron (ver preload.js)
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: false,
            contextIsolation: true
        }
    });

    const startUrl = url.format({
        pathname: path.join(__dirname, 'tela.html'),
        protocol: 'file',
    });

    mainWindow.loadURL(startUrl);
}

app.whenReady().then(createMainWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
