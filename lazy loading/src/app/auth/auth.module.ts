import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { AuthRoutingModule } from "./auth-routing.module";
import { AuthComponent } from "./auth.component";

@NgModule({
    declarations: [AuthComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, SharedModule, AuthRoutingModule],
    exports: [AuthComponent, AuthRoutingModule]
})
export class AuthModule {
}