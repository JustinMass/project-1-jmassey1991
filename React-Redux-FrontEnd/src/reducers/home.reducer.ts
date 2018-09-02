import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.actions";

const initialState: IHomeState = {
    reimbs: [{}]
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.LOAD_TABLE:
        return {
            ...state,
            reimbs: action.payload.reimbs
        }                       
    }
    return state;
}