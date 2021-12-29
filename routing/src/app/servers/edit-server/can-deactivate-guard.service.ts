import { ActivatedRouteSnapshot, CanDeactivate, RouterState, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";

export interface CanDeactivateComponent {
    canDeactivate: ()=> Observable<boolean> | Promise<boolean> | boolean;
}

export class CanDeactivateService implements CanDeactivate<CanDeactivateComponent> {
    canDeactivate(component: CanDeactivateComponent,
                    currRoute: ActivatedRouteSnapshot,
                    currState: RouterStateSnapshot,
                    nextState: RouterStateSnapshot) {
        return component.canDeactivate();
    }
}