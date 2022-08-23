import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CredentialModel, SharedCredential} from "./credential.model";
import {ClipboardService} from "../shared/clipboard.service";
import {CredentialService} from "../shared/credential.service";
import {trigger, state, style, transition, animate} from "@angular/animations";

@Component({
  selector: 'app-credential',
  templateUrl: './credential.component.html',
  styleUrls: ['./credential.component.scss'],
  animations: [
    trigger('inOutAnimation', [
     transition(
       ":enter",
       [
         style({ 'max-height': '0', }),
         animate('.2s', style({ 'max-height': '200px', })),
       ]
     ),
      transition(
        ":leave",
        [
          style({ 'max-height': '200px' }),
          animate('.2s', style({ 'max-height': '0' })),
        ]
      )
    ]),
  ]
})
export class CredentialComponent implements OnInit {
  @Input() credential?: CredentialModel
  sharedCredential?: SharedCredential
  showCredentialDetails = false
  showCredentialRemovalConfirmationModal = false

  constructor(
    private clipboard: ClipboardService,
    private credentialService: CredentialService
  ) { }

  ngOnInit(): void {
  }

  toggleShowCredentialDetails() {
    this.showCredentialDetails = !this.showCredentialDetails
  }

  async onCopyPasswordClicked() {
    if (this.credential) {
      const deciphered = this.credentialService.decipherCredential(this.credential)
      await this.clipboard.copy(deciphered)
    }
  }

  onDeleteCredentialClicked() {
    this.showCredentialRemovalConfirmationModal = true
  }

  onDeleteCredentialConfirmed() {
    if (this.credential) {
      this.credentialService.deleteCredential(this.credential)
    }
  }

  onCloseCredentialRemovalConfirmationModal() {
    this.showCredentialRemovalConfirmationModal = false
  }

  onShareClicked() {
    this.sharedCredential = this.credentialService.shareCredential(this.credential!)
  }
}
