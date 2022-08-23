const Store = require("nedb-promises");
const path = require("path")
const createNedbResourcesPath = require("./path")

class CredentialStore {
  constructor() {
    const dbPath = path.join(
      createNedbResourcesPath(),
      "credentials.db",
    )
    this.db = Store.create({
      filename: dbPath,
      timestampData: false,
    })
  }

  create(credential) {
    return this.db.insert(credential)
  }

  delete(id) {
    return this.db.remove({ _id: id }, {})
  }

  findAll() {
    return this.db.find({})
  }

  async findById(id) {
    return await this.db.findOne({ _id: id })
  }
}

module.exports = new CredentialStore()
