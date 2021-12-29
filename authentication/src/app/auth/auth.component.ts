import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  signIn: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  
  constructor(private auth: AuthService, private router: Router) {}

  startLoader() {
    this.isLoading = true;
    this.error = null;
  }

  stopLoader() {
    this.isLoading = false;
    this.error = null;
  }

  showError(msg: string) {
    this.error = msg;
    this.isLoading = false;
  }

  onAuthChange() {
    this.signIn = !this.signIn;
  }

  onAuthRequest(form: NgForm) {
    let authSubscription: Observable<any>;
    this.startLoader();
    if(this.signIn) {
      authSubscription = this.auth.signIn(form.value.email, form.value.password);
    } else {
      authSubscription = this.auth.signUp(form.value.email, form.value.password);
    }
    authSubscription.subscribe((_)=>{
      this.router.navigate(['/recipes']);
    }, (err=> {
      console.log("Receiving an error", err);
      this.showError(err);
    }));
  }

  onAlertClose() {
    this.error = null;
  }

}
