// PRELOAD DO ELECTRON
// Roda antes da página carregar e é a única ponte segura entre o app (HTML/JS)
// e o Electron/Node. Com contextIsolation ativo, a página só enxerga o que for
// exposto aqui via contextBridge. Para liberar algo novo, adicione em `flowlist`.
const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('flowlist', {
    plataforma: process.platform,
    versoes: {
        electron: process.versions.electron,
        chrome: process.versions.chrome,
        node: process.versions.node
    }
});
