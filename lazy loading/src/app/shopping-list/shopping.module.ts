import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ShoppingEditComponent } from "./shopping-edit/shopping-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";
import { ShoppingRoutingModule } from "./shopping-routing.module";

@NgModule({
    declarations: [
        ShoppingListComponent,
        ShoppingEditComponent,
    ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, ShoppingRoutingModule],
    exports: [
        ShoppingListComponent,
        ShoppingEditComponent,
        ShoppingRoutingModule
    ]
})
export class ShoppingModule {
}