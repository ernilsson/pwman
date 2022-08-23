import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {CredentialModel, SharedCredential} from "../../credential/credential.model";
import {CredentialService} from "../../shared/credential.service";
import {EncryptionKeyService} from "../../shared/encryption-key.service";

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.scss']
})
export class CredentialsComponent implements OnInit, OnDestroy {
  createCredentialModalOpen = false
  receivedSharedCredential = ''

  constructor(
    private credentialService: CredentialService,
    private passwordEncryptionService: EncryptionKeyService,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.credentialService.getSharedCredentialSubject().subscribe(
      this.onReceivedSharedCredential.bind(this)
    )
  }

  ngOnDestroy() {
    this.credentialService.getSharedCredentialSubject().unsubscribe()
  }

  onReceivedSharedCredential(encryptedCredential: string) {
    if (!this.receivedSharedCredential) {
      this.ngZone.run(() => {
        this.receivedSharedCredential = encryptedCredential
      })
    }
  }

  onReceivedSharedCredentialSubmitted() {
    this.receivedSharedCredential = ''
  }

  onReceivedSharedCredentialModalClosed() {
    this.receivedSharedCredential = ''
  }

  encryptionKeyIsLoaded(): boolean {
    return this.passwordEncryptionService.keyIsLoaded()
  }

  onCloseCreateCredentialModal() {
    this.createCredentialModalOpen = false
  }

  onCreateCredentialClicked() {
    this.createCredentialModalOpen = true
  }

  onCreateCredentialFormSubmitted(credential: CredentialModel) {
    this.credentialService.addCredential(credential)
    this.createCredentialModalOpen = false
  }
}
