const crypto = require("crypto-js")

class Crypto {
  encrypt(key, payload) {
    return crypto.AES.encrypt(payload, key).toString()
  }
  decrypt(key, cipher) {
    return crypto.AES.decrypt(cipher, key).toString(crypto.enc.Utf8)
  }
}

module.exports = new Crypto()
