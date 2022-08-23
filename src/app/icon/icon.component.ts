import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit, AfterViewInit {
  @Input() name = ""
  @Input() fill = ""
  @ViewChild("svg") svg?: ElementRef

  constructor(private renderer: Renderer2) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    if (this.svg && this.fill != "") {
      this.renderer.setStyle(this.svg.nativeElement, 'fill', this.fill)
    }
  }

  getFullIconName(): string {
    return `assets/svg/icons.svg#${this.name}`
  }
}
