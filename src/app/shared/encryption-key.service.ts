import { Injectable } from '@angular/core';
import * as Crypto from "crypto-js";
import {IpcRenderer} from "electron";

const RESET_KEY_TIMEOUT = 120 * 1000;

@Injectable({
  providedIn: 'root'
})
export class EncryptionKeyService {
  private key = ""
  private ipc: IpcRenderer

  constructor() {
    const { ipcRenderer } = window.require('electron')
    this.ipc = ipcRenderer
  }

  keyIsLoaded(): boolean {
    return this.key !== ""
  }

  getKey(): string {
    if (!this.keyIsLoaded()) {
      throw new Error("No key loaded")
    }
    return this.key
  }

  loadKey(key: string) {
    const valid = this.ipc.sendSync("validate-key", key) as boolean
    if (valid) {
      this.key = key
      setTimeout(() => {
        this.resetKey()
      }, RESET_KEY_TIMEOUT)
    } else {
      throw new Error("invalid key")
    }
  }

  private resetKey() {
    this.key = ""
  }
}
