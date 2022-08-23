import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {EncryptionKeyService} from "../../shared/encryption-key.service";

@Component({
  selector: 'app-enter-encryption-key',
  templateUrl: './enter-encryption-key.component.html',
  styleUrls: ['./enter-encryption-key.component.scss']
})
export class EnterEncryptionKeyComponent implements OnInit {
  // @ts-ignore
  enterEncryptionKeyForm: FormGroup
  errorPrompt = ""

  constructor(private encryptionKeyService: EncryptionKeyService) { }

  ngOnInit(): void {
    this.enterEncryptionKeyForm = new FormGroup({
      'encryptionKey': new FormControl("", [Validators.required, Validators.min(6)])
    })
  }

  onEnterEncryptionKeyFormSubmitted() {
    if (this.enterEncryptionKeyForm.valid) {
      this.loadEncryptionKey()
    }
  }

  loadEncryptionKey() {
    try {
      const { encryptionKey } = this.enterEncryptionKeyForm.value
      this.encryptionKeyService.loadKey(encryptionKey)
    } catch (err) {
      this.errorPrompt = "Invalid encryption key"
    }
  }
}
