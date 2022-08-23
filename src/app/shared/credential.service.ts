import {Injectable} from '@angular/core';
import {CredentialModel, ElectronCredentialModel, SharedCredential} from "../credential/credential.model";
import {Subject} from "rxjs";
import {IpcRenderer} from "electron";
import {EncryptionKeyService} from "./encryption-key.service";
import { IpcRendererEvent } from 'electron';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private credentialsSubject = new Subject<void>()
  private sharedCredentialsSubject = new Subject<string>()
  private credentials: CredentialModel[] = []
  private ipcRenderer: IpcRenderer

  constructor(private encryptionKeyService: EncryptionKeyService) {
    const { ipcRenderer } = window.require('electron')
    this.ipcRenderer = ipcRenderer
    this.mapIpcRequestHandlers()
  }

  private mapIpcRequestHandlers() {
    this.ipcRenderer.on("credentials:shared", this.onSharedCredentialReceived.bind(this))
  }

  private onSharedCredentialReceived(_: IpcRendererEvent, args: any) {
    const { credential } = args
    this.sharedCredentialsSubject.next(credential)
  }

  getCredentials(): CredentialModel[] {
    if (this.shouldLoadCredentials()) {
      this.loadCredentials()
    }
    return [...this.credentials]
  }

  shouldLoadCredentials(): boolean {
    return this.credentials == null || this.credentials.length === 0
  }

  loadCredentials() {
    const credentialData = this.ipcRenderer.sendSync("credentials:get") as ElectronCredentialModel[]
    this.credentials = credentialData.map((data) => {
      return CredentialModel.createFromElectron(data)
    })
  }

  addCredential(credential: CredentialModel) {
    try {
      const electronCredential = this.addCredentialToElectron(credential)
      this.addCredentialToInMem(
        CredentialModel.createFromElectron(electronCredential)
      )
    } catch (err) {
      console.log("could not add credential at this time.")
    }
  }

  private addCredentialToElectron(credential: CredentialModel): ElectronCredentialModel {
    const key = this.encryptionKeyService.getKey()
    return this.ipcRenderer.sendSync("credentials:add", {
      credential,
      key,
    }) as ElectronCredentialModel
  }

  private addCredentialToInMem(credential: CredentialModel) {
    this.credentials.push(credential)
    this.credentialsSubject.next()
  }

  addSharedCredential(credentialKey: string, encryptedCredential: string) {
    const electronCredential = this.addSharedCredentialToElectron(credentialKey, encryptedCredential)
    this.addCredentialToInMem(
      CredentialModel.createFromElectron(electronCredential)
    )
  }

  private addSharedCredentialToElectron(credentialKey: string, encryptedCredential: string): ElectronCredentialModel {
    const key = this.encryptionKeyService.getKey()
    return this.ipcRenderer.sendSync("credentials:add-shared", {
      credential: encryptedCredential,
      credentialKey,
      key,
    }) as ElectronCredentialModel
  }

  shareCredential(credential: CredentialModel): SharedCredential {
    const key = this.encryptionKeyService.getKey()
    const { id } = credential
    return this.ipcRenderer.sendSync("credentials:share", {id, key}) as SharedCredential
  }

  deleteCredential(credential: CredentialModel) {
    try {
      this.deleteCredentialFromElectron(credential.id)
      this.deleteCredentialFromInMem(credential.id)
    } catch (err) {
      console.log(err)
    }
  }

  private deleteCredentialFromElectron(id: string) {
    this.ipcRenderer.sendSync("credentials:delete", { id })
  }

  private deleteCredentialFromInMem(id: string) {
    this.credentials = this.credentials.filter((credential: CredentialModel) => {
      return credential.id !== id
    })
    this.credentialsSubject.next()
  }

  decipherCredential(credential: CredentialModel): string {
    try {
      const key = this.encryptionKeyService.getKey()
      return this.ipcRenderer.sendSync("credentials:decipher", {
        credential,
        key,
      })
    } catch (err) {
      console.log("could not decipher credential at this time.")
    }
    return "--"
  }

  getCredentialsSubject(): Subject<void> {
    return this.credentialsSubject
  }

  getSharedCredentialSubject(): Subject<string> {
    return this.sharedCredentialsSubject
  }
}
