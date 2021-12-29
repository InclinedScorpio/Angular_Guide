import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild("nameInput") nameInput: ElementRef;
  @ViewChild("amountInput") amountInput: ElementRef;

  @Output() addIngredient = new EventEmitter<Ingredient>();

  constructor() { }

  addIngredientFn() {
    let newIngredient:Ingredient = new Ingredient(this.nameInput.nativeElement.value, 
      this.amountInput.nativeElement.value);
    this.addIngredient.emit(newIngredient);
  }

  ngOnInit() {
  }

}
