import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class RequestInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, nextHandler: HttpHandler) {
        console.log("Logging the details...", req.url);
        const modifiedRequest = req.clone({headers: req.headers.append('Auth', 'xyz')})
        return nextHandler.handle(modifiedRequest).pipe(tap(event=>{ 
            if(event.type === HttpEventType.Response) {
                console.log("Event: ", event);
            }
        }));
    }
}