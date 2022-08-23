export class CredentialModel {
  id: string = ""
  name: string
  username: string
  password: string

  constructor(name: string, username: string, password: string) {
    this.name = name
    this.username = username
    this.password = password
  }

  static createFromElectron(model: ElectronCredentialModel): CredentialModel {
    const { name, username, password } = model;
    const credential = new CredentialModel(name, username, password)
    credential.id = model._id
    return credential
  }

  hasUsername(): boolean {
    return this.username.trim() !== ""
  }
}

export class ElectronCredentialModel {
  _id: string = ""
  name: string = ""
  username: string = ""
  password: string = ""
}

export class SharedCredential {
  key: string = ""
  link: string = ""
}
