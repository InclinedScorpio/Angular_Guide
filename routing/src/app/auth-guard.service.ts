import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

    constructor(private auth: AuthService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, 
                state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
                    return this.auth.isUserValidated().then((isAuthenticated: boolean)=> {
                        if(isAuthenticated) {
                            return true;
                        }else {
                            alert("Sorry don't have access");
                            return false;
                        }
                    });
    }

    canActivateChild(route: ActivatedRouteSnapshot,
                    state: RouterStateSnapshot) : Observable<boolean> | Promise<boolean> | boolean {
        return this.canActivate(route, state);
    }
}