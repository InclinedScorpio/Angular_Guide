import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    /**
     * BehaviourSubject keeps last state and if someone asks then returns it
     * Rest behaviour remains similar to Subject
     * 
     * In Subject, it won't return anything until something is emitted
     */
    public user = new BehaviorSubject<User>(null);
    timeoutSave:any;

    constructor(private http: HttpClient, private router: Router) {}

    private handleErrors = (error: HttpErrorResponse) => {
            let errorText = "Something went wrong";
            if(!error.error || !error.error || !error.error.error.message) 
                return errorText;

            switch(error.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorText = "Email already exists";
                    break;
                case 'INVALID_PASSWORD':
                    errorText = "Password is invalid";
                    break;
            }
            console.log("Error returning further...");
            return throwError(errorText);
    }

    signUp(email: string, password: string) {
        return this.http.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=<FIREBASE_WEB_API_KEY>", {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleErrors), tap(this.handleAuthentication));
    }

    signIn(email: string, password: string) {
        return this.http.post<any>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=<FIREBASE_WEB_API_KEY>", {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError(this.handleErrors), tap(this.handleAuthentication));
    }

    handleAuthentication = (res: any) => {
        const expirationDate = new Date(new Date().getTime() + (+res.expiresIn*1000));
        const user = new User(res.email, res.localId, res.idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(60 * 60);

        // store in local storage as well
        localStorage.setItem('user', JSON.stringify(user));
    }

    logout() {
        this.user.next(null);
        this.router.navigate(["/auth"]);
        localStorage.removeItem('user');
        if(this.timeoutSave) {
            clearTimeout(this.timeoutSave);
        }
        // this.timeoutSave = null;
    }

    autoLogin() {
        const isUserLoggedIn = localStorage.getItem('user');
        console.log("User check in local -- ", isUserLoggedIn);
        if(!isUserLoggedIn) {
            console.log("Inside navigate 2")
            return this.router.navigate(['/auth']);
        }
        console.log("outside navigate 2")
        const userDetails = JSON.parse(isUserLoggedIn);
        const user = new User(userDetails.email, userDetails.id, userDetails._token, new Date(userDetails._tokenExpiration));

        const autoLogoutTime = (user.getTokenExpirationTime().getTime() - new Date().getTime())/1000;
        this.autoLogout(autoLogoutTime);

        this.user.next(user);
    }

    autoLogout(expirationTime) {
        this.timeoutSave = setTimeout(()=> {
            this.logout();
        }, expirationTime*1000);
    }

}