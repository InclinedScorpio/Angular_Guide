import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanDeactivateComponent } from './can-deactivate-guard.service';

@Component({
selector: 'app-edit-server',
templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: {id: number, name: string, status: string};
  editable: boolean;
  edited: boolean = false;

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    this.editable = this.route.snapshot.queryParams["final"] === "true" ? true : false;
    this.server = this.serversService.getServer(+id);
  }

  onUpdateServer() {
    this.edited = true;
    this.serversService.updateServer(this.server.id, {name: this.server.name, status: this.server.status});
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate() {
    const id = this.route.snapshot.params["id"];
    const server = this.serversService.getServer(+id);
    if((this.server.name!=server.name || this.server.status != server.status) &&
        !this.edited ) {
        return confirm("Your changes are not saved! Do you want to leave?");
    }else {
      return true;
    }
  }
}
