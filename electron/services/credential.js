const DAO = require("../domain/credential")
const crypto = require("./crypto")
const DeepLinkBuilder = require("./deep-link")

const SHARED_CREDENTIAL_CONTROL_CODE = "control-code"

class CredentialService {

  constructor() {}

  create(key, credential) {
    if (this.validate(credential)) {
      credential.password = crypto.encrypt(key, credential.password)
      return DAO.create(credential)
    }
  }

  find() {
    return DAO.findAll()
  }

  decipher(key, credential) {
    return crypto.decrypt(key, credential.password)
  }

  delete(id) {
    return DAO.delete(id)
  }

  async addShared(encryptedCredential, credentialKey, key) {
    const credential = this.decipherSharedCredential(credentialKey, encryptedCredential)
    return this.create(key, credential)
  }

  decipherSharedCredential(credentialKey, encryptedCredential) {
    encryptedCredential = Buffer.from(
      encryptedCredential,
      'base64'
    ).toString('utf8')
    const jsonCredential = crypto.decrypt(credentialKey, encryptedCredential)
    console.log(jsonCredential)
    return JSON.parse(jsonCredential)
  }

  async shareCredential(id, key) {
    const unpreparedCredential = await DAO.findById(id)
    const credential = this.prepareCredentialForSharing(key, unpreparedCredential)
    const credentialKey = this.createRandomKey()
    const link = this.createSharingLink(credentialKey, credential)
    return {
      key: credentialKey,
      link
    }
  }

  prepareCredentialForSharing(key, credential) {
    delete credential._id
    delete credential.id
    credential.password = crypto.decrypt(key, credential.password)
    return credential
  }

  createRandomKey() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  }

  createSharingLink(key, credential) {
    const json = JSON.stringify(credential)
    const encrypted = crypto.encrypt(key, json)
    const encryptedEncodedBase64 = Buffer.from(encrypted).toString('base64')
    return new DeepLinkBuilder()
      .setTopic("share")
      .addQueryParam(
        "credential",
        encryptedEncodedBase64
      ).
      build()
  }

  validate(credential) {
    if (credential.name.trim() === "") {
      return false
    }
    return credential.password.trim() !== "";
  }
}

module.exports = new CredentialService()
