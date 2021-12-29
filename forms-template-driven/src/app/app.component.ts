import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild("f") signUpForm: NgForm;
  defaultSecretQuestion: string = 'teacher';
  defaultEmail:string = 'ashu@gmail.com';
  secretAnswer: string = "";
  genderList:string[] = ["Male", "Female"];
  suggestUsername:string = "ashutosh"

  suggestUserNamefn() {
    this.signUpForm.form.patchValue({
      myGroup: {
        username: this.suggestUsername,
      }
    });
  }

  onSubmit() {
    console.log(this.signUpForm);
  }
}
