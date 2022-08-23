import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input() placeholder: string = ""
  @Output("onQueryChanged") queryChangeEventEmitter = new EventEmitter<string>()
  query = ""
  constructor() { }

  ngOnInit(): void {
  }

  onQueryChanged() {
    this.queryChangeEventEmitter.emit(this.query)
  }
}
