import { IHomeState } from ".";
import { homeTypes } from "../actions/home/home.actions";

const initialState: IHomeState = {
    filter: 'default',
    reimbs: [{
    reimb_amount: 0,
    reimb_author: 0,
    reimb_description: '',
    reimb_id: 0,
    reimb_receipt: '',
    reimb_resolved:  '',
    reimb_resolver: 0,
    reimb_status: '',
    reimb_submitted: '',
    reimb_type: '',
    }],
}

export const homeReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case homeTypes.LOAD_TABLE:
        return {
            ...state,
            reimbs: action.payload.reimbs
        } 
        case homeTypes.LOAD_FM_TABLE:
        return {
            ...state,
            reimbs: action.payload.reimbs
        }
        case homeTypes.FILTER_TABLE: 
          return {  ...state,
            filter: action.payload.filter,
            reimbs: action.payload.reimbs
        }
        case homeTypes.FILTER_FM_TABLE: 
          return {  ...state,
            filter: action.payload.filter,
            reimbs: action.payload.reimbs
        }                                        
    }
    return state;
}