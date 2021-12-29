import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { AddIngredient, DeleteIngredient, UpdateIngredient } from '../store/shopping-list.action';
import * as fromAppReducer from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private store: Store<fromAppReducer.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList').subscribe(ingredient=> {
      this.editedItemIndex = ingredient.editingIngredientIndex;
      this.editedItem = ingredient.editingIngredient;
      if(this.editedItemIndex == -1) {
        this.editMode = false;
      }else {
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
        this.editMode = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({index: this.editedItemIndex, ingredient: newIngredient}));
    } else {
      this.store.dispatch(new AddIngredient(newIngredient));
    }
    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient(this.editedItemIndex));
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
