const { contextBridge, ipcRender } = require('electron');

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRender.send('dark-mode:toggle'),
  system: () => ipcRender.send('dark-mode:system')
});

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type]);
    // replaceText(`${type}-version`, process.platform);
    // replaceText(`${type}-version`, process.arch);
    // replaceText(`${type}-version`, process.release);
  }

});