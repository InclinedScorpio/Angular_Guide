import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import { ActionReducerMap } from '@ngrx/store';

/**
 * Complete App State - shows slices of states with key 
 * This state can be used in components
 * 
 */
export interface AppState {
    shoppingList: fromShoppingList.ShoppingState,
    auth: fromAuth.AuthState
}

/**
 * This below we used to have in app module...
 * but this now can directly be used there
 * 
 */
export const appReducer: ActionReducerMap<AppState> = {
    shoppingList: fromShoppingList.ShoppingListReducer,
    auth: fromAuth.authReducer
}
