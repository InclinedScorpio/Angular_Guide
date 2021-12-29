import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  @Input() set appUnless(condition: Boolean) {
    if(condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
    }else {
      this.vcRef.clear();
    }
  }

  // Both points to Template location but we need to use ViewContainerRef for changing anything
  // TemplateRef is also referring to element, but it basically is just a reference to the content
  constructor(private templateRef:TemplateRef<any>, private vcRef: ViewContainerRef) {}
}
