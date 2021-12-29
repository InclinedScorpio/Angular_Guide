import { Directive, HostBinding, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appBasicBetterHighlight]'
})
export class BasicBetterHighlightDirective implements OnInit{
  @Input("appBasicBetterHighlight") defaultBackgroundColor: string;
  @Input() hoverBackgroundColor: string;
  
  ngOnInit() {
    this.backgroundColor = "yellow";
  }

  // make sure to mention the exact property inside ("")
  @HostBinding("style.backgroundColor") backgroundColor: string;

  @HostListener("mouseenter") mouseEnter(event:Event) {
    this.backgroundColor = this.hoverBackgroundColor;
  }

  @HostListener("mouseleave") mouseLeave(event: Event) {
    this.backgroundColor = this.defaultBackgroundColor;
  }
}
