import * as Actions from "./shopping-list.action";
import { Ingredient } from "../../shared/ingredient.model";

/**
 * How shopping state will be
 */
export interface ShoppingState {
    ingredients: Ingredient[],
    editingIngredient: Ingredient,
    editingIngredientIndex: number
}

const initialState =  {
    ingredients: [
        new Ingredient('Apples', 6),
        new Ingredient('Tomatoes', 9)
    ],
    editingIngredient: null,
    editingIngredientIndex: -1
};

export function ShoppingListReducer(state = initialState, action: Actions.ShoppingListActions) {
    switch(action.type) {
        case Actions.ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    action.payload
                ]
            }
        case Actions.ActionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    ...state.ingredients,
                    ...action.payload
                ]
            }
        case Actions.ActionTypes.UPDATE_INGREDIENT:
            const ingredientToUpdate = {...state.ingredients[action.payload.index]};
            const copyIngredient = [...state.ingredients];
            copyIngredient[action.payload.index] = {
                ...ingredientToUpdate,
                ...action.payload.ingredient
            }
            return {
                ...state,
                ingredients: copyIngredient
            }
        case Actions.ActionTypes.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter((_, ingIndex)=> {
                    return ingIndex!=action.payload
                })
            }
        case Actions.ActionTypes.START_EDITING:
            return {
                ...state,
                editingIngredientIndex: action.payload,
                editingIngredient: {...state.ingredients[action.payload]}
            }
        case Actions.ActionTypes.STOP_EDITING:
            return {
                ...state,
                editingIngredient: false,
                editingIngredientIndex: -1
            }
        default:
            return state;
    }
}