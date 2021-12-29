import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { exhaustMap, map, take, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
      return this.http
      .put(
        '<JSON_URL_FOR_FIREBASE_OR_BACKEND_URL>',
        recipes
      ).subscribe(data=>{
      console.log("Data stored to db: ", data);
    });
  }

  fetchRecipes() {
      return this.http
        .get<Recipe[]>(
          '<JSON_URL_FOR_FIREBASE_OR_BACKEND_URL>', {
          }
        )
        .pipe(
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }))
  }
}
