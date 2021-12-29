import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private auth:AuthService) { }

  ngOnInit() {
  }

  buttonClicked() {
    this.router.navigate([""]);
  }

  serverButtonClicked() {
    this.router.navigate(["/servers", "1", "edit"], {queryParams: {final: true}, fragment: "loading"});
  }

  onLogin() {
    this.auth.login();
  }

  onLogout() {
    this.auth.logout();
  }
}
