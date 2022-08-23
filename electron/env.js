const {app} = require("electron")

const isProduction = () => {
  return process.env.APP_ENV === "prod" || app.isPackaged
}

module.exports = isProduction
