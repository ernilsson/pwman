import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CredentialModel} from "../../credential/credential.model";

@Component({
  selector: 'app-confirm-credential-removal',
  templateUrl: './confirm-credential-removal.component.html',
  styleUrls: ['./confirm-credential-removal.component.scss']
})
export class ConfirmCredentialRemovalComponent implements OnInit {
  @Input() credential?: CredentialModel
  @Output("confirm") onConfirmationEventEmitter = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onConfirmRemoval() {
    this.onConfirmationEventEmitter.emit()
  }
}
