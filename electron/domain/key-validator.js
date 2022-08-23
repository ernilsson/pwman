const Store = require("nedb-promises");
const crypto = require("crypto-js")
const path = require("path");
const createNedbResourcesPath = require("./path")

const VALIDATOR_PLAIN_TEXT = "pwman"

class KeyValidatorStore {
  constructor() {
    const dbPath = path.join(
      createNedbResourcesPath(),
      "validators.db",
    )
    this.db = Store.create({
      filename: dbPath,
      timestampData: false,
    })
  }

  async validate(key) {
    const numberOfValidators = await this.getNumberOfValidators()
    if (numberOfValidators === 0) {
      await this.create(key)
      return true
    }
    const cipher = await this.find()
    const plainText = crypto.AES.decrypt(cipher, key).toString(crypto.enc.Utf8)
    return plainText === VALIDATOR_PLAIN_TEXT
  }

  async create(key) {
    const cipher = crypto.AES.encrypt(VALIDATOR_PLAIN_TEXT, key).toString()
    await this.db.insert({ cipher })
  }

  async find() {
    const validator = await this.db.findOne({})
    return validator.cipher
  }

  getNumberOfValidators() {
    return this.db.count({})
  }
}

module.exports = new KeyValidatorStore()
