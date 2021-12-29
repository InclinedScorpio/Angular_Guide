import { Injectable } from "@angular/core";

@Injectable()
export class LoggingService  {
    logIt(accountStatus:string) {
        console.log('A server status changed, new status: ' + accountStatus);
    }
}