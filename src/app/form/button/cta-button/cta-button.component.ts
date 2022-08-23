import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-cta-button',
  templateUrl: './cta-button.component.html',
  styleUrls: ['./cta-button.component.scss']
})
export class CtaButtonComponent implements OnInit {
  @Input() text = ""
  @Output("click") onClickedEventEmitter = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onClickedEventEmitter.emit();
  }
}
