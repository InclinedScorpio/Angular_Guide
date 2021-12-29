import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "./auth-guard.service";
import { ErrorPageComponent } from "./error-page/error-page.component";

import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { CanDeactivateService } from "./servers/edit-server/can-deactivate-guard.service";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerResolver } from "./servers/server/server-resolver.service";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
    {path: "", component: HomeComponent},
    {path: "users", component: UsersComponent, children: [
      {path: ":id/:name", component: UserComponent},
    ]},
    {path: "servers", canActivateChild: [AuthGuardService], component: ServersComponent, children: [
      {path: ":id", component: ServerComponent, resolve: {server: ServerResolver}},
      {path: ":id/edit", canDeactivate: [CanDeactivateService], component: EditServerComponent}
    ]},
    // {path: 'page-not-found', component: PageNotFoundComponent},
    {path: 'page-not-found', component: ErrorPageComponent, data: {message: "Some error occured"}},
    {path: '**', redirectTo: 'page-not-found'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}