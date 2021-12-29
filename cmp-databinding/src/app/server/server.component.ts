import { Component, ContentChild, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  @Input("srvElement") serverElements: [{type: String, name: String, content: String}];
  @ContentChild("randomText") randomText: ElementRef;
  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
    console.log("here: ",this.randomText.nativeElement.textContent);
  }

}
