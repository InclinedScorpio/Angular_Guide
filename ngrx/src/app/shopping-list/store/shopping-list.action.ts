import { Action } from "@ngrx/store";
import { Ingredient } from "src/app/shared/ingredient.model";

export const enum ActionTypes {
    ADD_INGREDIENT = "[Shopping List] Add Ingredient",
    ADD_INGREDIENTS = "[Shopping List]  Add Ingredients",
    UPDATE_INGREDIENT = "[Shopping List] Update Ingredient",
    DELETE_INGREDIENT = "[Shopping List] Delete Ingredient",
    START_EDITING = "[Shopping List] Start Editing", 
    STOP_EDITING = "[Shopping List] Stop Editing"
}

export class AddIngredient implements Action {
    readonly type = ActionTypes.ADD_INGREDIENT;
    constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ActionTypes.ADD_INGREDIENTS;
    constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
    readonly type = ActionTypes.UPDATE_INGREDIENT;
    constructor(public payload: {index: number, ingredient: Ingredient}){}
}

export class DeleteIngredient implements Action {
    readonly type = ActionTypes.DELETE_INGREDIENT;
    constructor(public payload: number) {}
}

export class StartEditing implements Action {
    readonly type = ActionTypes.START_EDITING;
    constructor(public payload: number){}
}

export class StopEditing implements Action {
    readonly type = ActionTypes.STOP_EDITING;
}

export type ShoppingListActions = 
    AddIngredient       |
    AddIngredients      |
    UpdateIngredient    | 
    DeleteIngredient    |
    StartEditing        |
    StopEditing;