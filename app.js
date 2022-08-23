const {app} = require('electron')
const CredentialController = require("./electron/controllers/credential")
const KeyValidatorController = require("./electron/controllers/key-validator")
const WindowFactory = require("./electron/window-factory")
const isProduction = require("./electron/env")

let mainWindow

async function init() {
  mainWindow = WindowFactory
    .createFactory()
    .createWindow()

  app.setAsDefaultProtocolClient("pwman")

  CredentialController.mapIpcRoutes().then(async () => {
    if (!isProduction()) {
      console.log("credential ipc routes initialised")
    }
    CredentialController.mapDeepLinking(app, mainWindow)
  })
  KeyValidatorController.mapIpcRoutes().then(() => {
    if (!isProduction()) {
      console.log("key-validator ipc routes initialised")
    }
  })
}

app.on('ready', init)
