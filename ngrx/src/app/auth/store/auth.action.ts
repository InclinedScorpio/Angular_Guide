import { User } from "../user.model";
import { Action } from "@ngrx/store";

export const enum ActionTypes {
  LOGIN_START = "[Auth] Login start",
  LOGIN_ERROR = "[Auth] Login error",
  AUTHENTICATE_USER = "[Auth] Authenticate User",
  LOGOUT = "[Auth] Logout",
  SIGNUPSTART = "[Auth] Signup Start",
  CLEAR_ERROR = "[Auth] Clear Error",
  AUTO_LOGOUT = "[Auth] Auto Logout",
}

export class LoginStart implements Action {
  readonly type = ActionTypes.LOGIN_START;
  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateUser implements Action {
  readonly type = ActionTypes.AUTHENTICATE_USER;
  constructor(public payload: User) {}
}

export class LogoutUser implements Action {
  readonly type = ActionTypes.LOGOUT;
}

export class LoginError implements Action {
  readonly type = ActionTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = ActionTypes.SIGNUPSTART;
  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = ActionTypes.CLEAR_ERROR;
}

export class AutoLogout implements Action {
  readonly type = ActionTypes.AUTO_LOGOUT;
}

export type AuthActions =
  | LogoutUser
  | LoginStart
  | LoginError
  | SignupStart
  | AuthenticateUser
  | ClearError
  | AutoLogout;
