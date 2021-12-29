import { Directive, ElementRef, OnInit } from "@angular/core";

@Directive({
    selector: '[basic-highlight]'
})
export class BasicHighlight implements OnInit {

    constructor(private elementRef: ElementRef) {
    }

    ngOnInit() {
        this.elementRef.nativeElement.style.backgroundColor="pink";
    }
}