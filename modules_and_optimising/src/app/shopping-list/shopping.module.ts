import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [SharedModule, FormsModule, ReactiveFormsModule, ShoppingRoutingModule],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
        RouterModule
    ]
})
export class ShoppingModule {
}