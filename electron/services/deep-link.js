class DeepLinkBuilder {
  constructor() {
    this.protocol = "pwman"
    this.topic = ""
    this.queryParams = new Map()
  }

  setTopic(topic) {
    this.topic = topic
    return this
  }

  addQueryParam(key, value) {
    this.queryParams.set(key, value)
    return this
  }

  build() {
    const queryParams = this.marshalQueryParams()
    return `${this.protocol}://${this.topic}?${queryParams}`
  }

  marshalQueryParams() {
    let queryParams = ""
    this.queryParams.forEach((value, key) => {
      queryParams += `${key}=${value}&`
    })
    return queryParams
  }
}

module.exports = DeepLinkBuilder
