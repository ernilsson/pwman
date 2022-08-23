const createNedbBasePath = () => {
  if (process.env.APP_ENV === "dev") {
    return __dirname
  } else {
    return process.resourcesPath
  }
}

module.exports = createNedbBasePath
