import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-floating-button',
  templateUrl: './floating-button.component.html',
  styleUrls: ['./floating-button.component.scss']
})
export class FloatingButtonComponent implements OnInit {
  @Input() icon = ""
  @Output("click") onClickedEventEmitter = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }

  onClicked() {
    this.onClickedEventEmitter.emit();
  }
}
