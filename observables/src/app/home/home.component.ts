import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private intervalSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const customObservable = Observable.create((observer)=> {
      let count = 0;
      setInterval(()=> {
        count++;
        observer.next(count)
      }, 1000)
    });

    const changeObservale = customObservable.pipe(map((data: number)=> {
      return 'Point: '+ data; 
    }))

    this.intervalSubscription = changeObservale.subscribe((count)=>{
      console.log(count);
    }, (error)=> {
      console.log("Error received -- ", error);
    }, ()=> {
      console.log("Observable is completed, and this is not compulsorily present")
    });
  }

  ngOnDestroy() {
    this.intervalSubscription.unsubscribe();
  }

}
