const {ipcMain} = require("electron");
const KeyValidatorService = require("../services/key-validator");

class KeyValidatorController {
  async mapIpcRoutes() {
    ipcMain.on(
      "validate-key",
      await this.ipcRequestHandlerWrapper(this.onValidateKey)
    )
  }

  async ipcRequestHandlerWrapper(handler) {
    return async (event, arg) => {
      event.returnValue = await handler(arg)
      if (!event.returnValue) {
        event.returnValue = ""
      }
    }
  }

  async onValidateKey(arg) {
    return await KeyValidatorService.validate(arg);
  }
}

module.exports = new KeyValidatorController()
