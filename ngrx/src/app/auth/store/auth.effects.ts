import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, ofType, Effect } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { AuthService } from "../auth.service";
import { User } from "../user.model";
import * as AuthAction from "./auth.action";

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthAction.ActionTypes.LOGIN_START),
    switchMap((loginStartAction: AuthAction.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=<FIREBASE_WEB_API_KEY>",
          {
            email: loginStartAction.payload.email,
            password: loginStartAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((resData: any) => {
            return this.handleAuthSuccess(resData);
          }),
          catchError((errorRes) => {
            return this.handleAuthError(errorRes);
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authLoginSuccess = this.actions$.pipe(
    ofType(AuthAction.ActionTypes.AUTHENTICATE_USER),
    map((_) => {
      this.router.navigate(["/"]);
    })
  );

  @Effect()
  signup = this.actions$.pipe(
    ofType(AuthAction.ActionTypes.SIGNUPSTART),
    switchMap((signUpStartAction: AuthAction.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=<FIREBASE_WEB_API_KEY>",
          {
            email: signUpStartAction.payload.email,
            password: signUpStartAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((signedUpUser) => {
            return this.handleAuthSuccess(signedUpUser);
          }),
          catchError((error) => {
            return this.handleAuthError(error);
          })
        );
    })
  );

  handleAuthSuccess = (resData: AuthResponseData) => {
    const data = {
      email: resData.email,
      userId: resData.localId,
      token: resData.idToken,
      expiresIn: +resData.expiresIn,
    };
    const expirationDate = new Date(
      new Date().getTime() + data.expiresIn * 1000
    );
    const user = new User(data.email, data.userId, data.token, expirationDate);
    localStorage.setItem("userData", JSON.stringify(user));

    const expirationDuration =
    new Date(expirationDate).getTime() -
    new Date().getTime();
    this.authService.autoLogoutTimer(expirationDuration);

    return new AuthAction.AuthenticateUser(user);
  };

  handleAuthError = (errorRes: any) => {
    console.log("Inside here errorRes");
    let errorMessage = "An unknown error occurred!";
    if (!errorRes.error || !errorRes.error.error) {
      // return throwError(errorMessage);
      return of(new AuthAction.LoginError(errorMessage));
    }
    switch (errorRes.error.error.message) {
      case "EMAIL_EXISTS":
        errorMessage = "This email exists already";
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exist.";
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct.";
        break;
      // return action with data
    }
    return of(new AuthAction.LoginError(errorMessage));
  };

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
