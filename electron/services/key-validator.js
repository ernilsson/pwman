const DAO = require("../domain/key-validator")

class KeyValidatorService {
  constructor() { }

  async validate(key) {
    if (this.valid(key)) {
      return await DAO.validate(key)
    }
    return false
  }

  valid(key) {
    return key.trim() !== ""
  }
}

module.exports = new KeyValidatorService()
