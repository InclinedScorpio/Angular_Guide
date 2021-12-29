import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  @Output() receipeClicked = new EventEmitter<Recipe>();
  recipes: Recipe[] = [
    new Recipe('Dal Makhani Recipe', 'This is a dal makhani receipe', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg'),
    new Recipe('Rajma Chawal Recipe', 'Wohoo, Rajma chawal it is!', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg')
  ];

  receipeClickedFn(receipe: Recipe) {
    console.log("Receipe clicked is - ", receipe);
    this.receipeClicked.emit(receipe);
  }

  constructor() { }

  ngOnInit() {
  }

}
