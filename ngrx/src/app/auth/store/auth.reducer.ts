import { User } from "../user.model";
import { ActionTypes, AuthActions } from "./auth.action";

export interface AuthState {
    user: User,
    errorMsg: string,
    isLoading: boolean
}

export const initialState = {
    user: null,
    errorMsg: null,
    isLoading: false
}

export function authReducer(state = initialState, action: AuthActions) { 
    switch (action.type) {
        case ActionTypes.AUTHENTICATE_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false,
                errorMsg: null
            }
        case ActionTypes.LOGOUT:
            return {
                ...state,
                user: null,
            }
        case ActionTypes.LOGIN_START:
        case ActionTypes.SIGNUPSTART:
            return {
                ...state,
                isLoading: true,
                errorMsg: null
            }
        case ActionTypes.LOGIN_ERROR:
            return {
                ...state,
                isLoading: false,
                errorMsg: action.payload
            }
        default:
            return state;
    }
}
