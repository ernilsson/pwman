import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CredentialModel} from "../../credential/credential.model";
import {CredentialService} from "../../shared/credential.service";

@Component({
  selector: 'app-received-shared-credential',
  templateUrl: './received-shared-credential.component.html',
  styleUrls: ['./received-shared-credential.component.scss']
})
export class ReceivedSharedCredentialComponent implements OnInit {
  @Input() encryptedCredential = ''
  @Output("submit") onSubmitEventEmitter = new EventEmitter<string>()
  receivedSharedCredentialForm: FormGroup
  errorPrompt = ""

  constructor(private credentialService: CredentialService) {
    this.receivedSharedCredentialForm = new FormGroup({
      'encryptionKey': new FormControl("", [Validators.required])
    })
  }

  ngOnInit(): void {
  }

  onReceivedSharedCredentialFormSubmitted() {
    if (this.receivedSharedCredentialForm.valid) {
      const { encryptionKey } = this.receivedSharedCredentialForm.value
      this.addSharedCredential(encryptionKey)
    }
  }

  addSharedCredential(encryptionKey: string) {
    try {
      this.credentialService.addSharedCredential(encryptionKey, this.encryptedCredential)
    } catch (err) {
      this.errorPrompt = err.toString()
    }
  }
}
