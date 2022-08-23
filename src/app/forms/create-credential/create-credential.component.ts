import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CredentialModel} from "../../credential/credential.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-credential',
  templateUrl: './create-credential.component.html',
  styleUrls: ['./create-credential.component.scss']
})
export class CreateCredentialComponent implements OnInit {
  @Output("create") create = new EventEmitter<CredentialModel>()
  // @ts-ignore
  createCredentialForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.createCredentialForm = new FormGroup({
      'name': new FormControl("", [Validators.required]),
      'username': new FormControl(""),
      'password': new FormControl("", [Validators.required])
    })
  }

  onSubmit() {
    if (this.createCredentialForm.valid) {
      const {name, username, password} = this.createCredentialForm.value;
      const credential = new CredentialModel(name, username, password)
      this.create.emit(credential)
    }
  }
}
