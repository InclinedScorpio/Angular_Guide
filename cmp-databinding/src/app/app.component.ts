import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent {
  serverElements:[{type: String, name: String, content: String}] 
    = [{type: "server", name: "my-server",content: "my-content"}];

  addNewServer(server: {type: String, name: String, content: String}) {
    this.serverElements.push(server);
  }
}
