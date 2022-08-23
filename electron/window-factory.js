const {BrowserWindow, app, globalShortcut} = require("electron");
const path = require("path");
const isProduction = require("./env")

class WindowFactory {
  createFactory() {
    if (isProduction()) {
      return new ProductionWindowFactory()
    } else {
      return new DevelopmentWindowFactory()
    }
  }
}

class DevelopmentWindowFactory {
  createWindow() {
    const mainWindow = createBaseWindow()
    mainWindow.loadURL("http://localhost:4200")
    mainWindow.webContents.openDevTools()
    return mainWindow
  }
}

class ProductionWindowFactory {
  createWindow() {
    const mainWindow = createBaseWindow()
    const pathname = path.join(__dirname, "../dist/pwman/index.html")
    mainWindow.loadURL(`file:${pathname}`)
    mainWindow.resizable = false
    this.disableWindowRefresh()
    return mainWindow
  }

  disableWindowRefresh() {
    app.on('browser-window-focus', () => {
      globalShortcut.register("CommandOrControl+R", () => {})
      globalShortcut.register("F5", () => {})
    })
    app.on('browser-window-blur', function () {
      globalShortcut.unregister("CommandOrControl+R");
      globalShortcut.unregister("F5");
    });
  }
}

const createBaseWindow = () => {
  return new BrowserWindow({
    width: 350,
    height: 450,
    icon: path.join(__dirname, "src/assets/icon.png"),
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      preload: `${__dirname}/preload.js`,
    },
  })
}

module.exports = new WindowFactory()
