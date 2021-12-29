import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  @Output() serverCreated = new EventEmitter<{type: String, name: String, content: String}>();
  @Output() bluePrintCreated = new EventEmitter<{type: String, name: String, content: String}>();

  @ViewChild("serverContent") serverContent:ElementRef;
  newServerName = '';
  newServerContent = '';

  constructor() { }

  ngOnInit(): void {
  }

  onAddServer(serverName:HTMLInputElement, serverContent:HTMLInputElement) {
    this.serverContent.nativeElement.value="1234";
    this.serverCreated.emit({
      type: 'server',
      name: serverName.value,
      content: serverContent.value
    });
  }

  onAddBlueprint(serverName:HTMLInputElement, serverContent:HTMLInputElement) {
    this.bluePrintCreated.emit({
      type: "blueprint",
      name: serverName.value,
      content: serverContent.value
    });
  }

}
