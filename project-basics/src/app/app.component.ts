import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentNav:string;

  navClicked(navDetail: string) {
    this.currentNav = navDetail;
  }
}
