import {Component, Input, OnInit} from '@angular/core';
import {SharedCredential} from "../../credential/credential.model";

@Component({
  selector: 'app-shared-credential',
  templateUrl: './shared-credential.component.html',
  styleUrls: ['./shared-credential.component.scss']
})
export class SharedCredentialComponent implements OnInit {
  @Input() sharedCredential?: SharedCredential

  constructor() { }

  ngOnInit(): void {

  }
}
