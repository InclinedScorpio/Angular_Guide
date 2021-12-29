import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output("changeNav") navClicked = new EventEmitter<string>();
  
  changeNav(navDetail: string) {
    this.navClicked.emit(navDetail);
  }
}
