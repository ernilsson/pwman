import {Component, ElementRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('inOutAnimation', [
      transition(
        ":enter",
        [
          style({ 'transform': 'translate(-50%, -60%)' }),
          animate('.5s ease-out', style({ 'transform': 'translate(-50%, -50%)' })),
        ]
      ),
      transition(
        ":leave",
        [
          style({ 'transform': 'translate(-50%, -50%)' }),
          animate('.5s ease-out', style({ 'transform': 'translate(-50%, -60%)' })),
        ]
      )
    ]),
    trigger('fadeInOutAnimation', [
      transition(
        ":enter",
        [
          style({ 'opacity': '0' }),
          animate('.2s ease-out', style({ 'opacity': '1' })),
        ]
      ),
      transition(
        ":leave",
        [
          style({ 'opacity': '1' }),
          animate('.2s ease-out', style({ 'opacity': '0' })),
        ]
      )
    ]),
  ]
})
export class ModalComponent implements OnInit {
  @Output("close") onCloseEventEmitter = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void { }

  close() {
    this.onCloseEventEmitter.emit()
  }
}
