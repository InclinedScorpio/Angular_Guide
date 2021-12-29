import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  forBiddenNames = ['ashu', 'tosh', 'tiwari'];
  
  signUpForm: FormGroup;
  
  ngOnInit() {
    this.signUpForm = new FormGroup({
      userData: new FormGroup({ 
        username: new FormControl(null, [Validators.required, this.checkForbiddenName.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email,], this.checkEmailAsync.bind(this)),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    this.signUpForm.setValue({
      userData: {
        username: "ashutosh",
        email: "ashu@gmail.com"
      },
      gender: "male",
      hobbies: []
    })


    // this.signUpForm.statusChanges.subscribe(value=> {
    //   console.log(value);
    // })
  }

  onSubmit() {
    console.log("Submit:: ", this.signUpForm);
  }

  onHobbyAdd() {
    const control: FormControl = new FormControl(null, Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(control);
  }

  getHobbies() {
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }

  checkForbiddenName(control: FormControl): any{
    if(this.forBiddenNames.indexOf(control.value) !== -1) {
      return {"userForbidden": true};
    }else {
      return null;
    }
  }

  checkEmailAsync(control: FormControl): Promise<any> | Observable<any> {
      const promise = new Promise<any>((resolve, reject)=> {
        setTimeout(()=> {
          if(control.value=="ashu@g.com") {
            resolve({'emailNotAllowed': true});
          }else {
            resolve(null);
          }
        }, 1000);
      });
      return promise;
    }
}
