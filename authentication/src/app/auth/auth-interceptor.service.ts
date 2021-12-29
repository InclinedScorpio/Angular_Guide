import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, take } from "rxjs/operators";
import { AuthService } from "./auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>,  nextHandler: HttpHandler) {
        return this.auth.user.pipe(take(1), exhaustMap(user=> {
            if(!user) {
                return nextHandler.handle(req);
            }
            const newRequest = req.clone({params: new HttpParams().set('auth', user.getToken())})
            return nextHandler.handle(newRequest);
        }));
    }

}