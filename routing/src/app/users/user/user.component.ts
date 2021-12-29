import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  id:string;
  name: string
  paramSubscription:Subscription;

  constructor(private currRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.currRoute.snapshot.params["id"] || 1;
    this.name = this.currRoute.snapshot.params["name"] || "demo";
    this.paramSubscription = this.currRoute.params.subscribe(
      (params)=> {
        console.log("New params received");
        this.id = params.id;
        this.name = params.name;
      }
    )
  }

  // Angular will do this for us as params is built by Angular
  ngOnDestroy() {
    this.paramSubscription.unsubscribe();
  }
}
