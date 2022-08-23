const {ipcMain, dialog} = require("electron");
const KeyValidatorService = require("../services/key-validator");
const CredentialService = require("../services/credential");

class CredentialController {
  async mapIpcRoutes() {
    ipcMain.on(
      "credentials:add",
      await this.ipcRequestHandlerWrapper(this.onInsertCredential)
    )
    ipcMain.on(
      "credentials:get",
      await this.ipcRequestHandlerWrapper(this.onGetCredentials)
    )
    ipcMain.on(
      "credentials:delete",
      await this.ipcRequestHandlerWrapper(this.onDeleteCredential)
    )
    ipcMain.on(
      "credentials:decipher",
      await this.ipcRequestHandlerWrapper(this.onDecipherCredential)
    )
    ipcMain.on(
      "credentials:add-shared",
      await this.ipcRequestHandlerWrapper(this.onAddSharedCredential)
    )
    ipcMain.on(
      "credentials:share",
      await this.ipcRequestHandlerWrapper(this.onShareCredential)
    )
  }

  mapDeepLinking(app, mainWindow) {
    app.on('open-url', (event, deepLinkUrl) => {
      const parsedUrl = new URL(deepLinkUrl)
      mainWindow.webContents.send("credentials:shared", {
        credential: parsedUrl.searchParams.get("credential"),
      })
    })
  }

  async ipcRequestHandlerWrapper(handler) {
    return async (event, arg) => {
      try {
        event.returnValue = await handler(arg)
        if (!event.returnValue) {
          event.returnValue = ""
        }
      } catch (err) {
        event.returnValue = err
      }
    }
  }

  async onInsertCredential(arg) {
      const { credential, key } = arg
      const keyIsValid = await KeyValidatorService.validate(key)
      if (keyIsValid) {
        return CredentialService.create(key, credential);
      } else {
        return new Error("Invalid key")
      }
  }

  async onGetCredentials(arg) {
    return await CredentialService.find()
  }

  async onDeleteCredential(arg) {
    const { id } = arg
    CredentialService.delete(id)
  }

  async onDecipherCredential(arg) {
    const { credential, key } = arg
    const keyIsValid = await KeyValidatorService.validate(key)
    if (keyIsValid) {
      return CredentialService.decipher(key,credential)
    } else {
      throw new Error("Invalid key")
    }
  }

  async onAddSharedCredential(arg) {
    const { credential, key, credentialKey } = arg
    const keyIsValid = await KeyValidatorService.validate(key)
    if (keyIsValid) {
      return CredentialService.addShared(credential, credentialKey, key)
    } else {
      throw new Error("Invalid key")
    }
  }

  async onShareCredential(arg) {
    const { id, key } = arg
    return await CredentialService.shareCredential(id, key)
  }
}

module.exports = new CredentialController()
