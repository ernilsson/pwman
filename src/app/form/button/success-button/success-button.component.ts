import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-success-button',
  templateUrl: './success-button.component.html',
  styleUrls: ['./success-button.component.scss']
})
export class SuccessButtonComponent implements OnInit {
  @Input() text = ""
  @Output("onClicked") onClickedEventEmitter = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onClickedEventEmitter.emit();
  }
}
