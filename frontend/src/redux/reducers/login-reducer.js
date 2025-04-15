import { LOGIN_BUTTON_CLICKED } from "../actions/types";

export default function(state=null, action){
    switch(action.type){
        case LOGIN_BUTTON_CLICKED:
            return action.payload;
            break;
    }
    return state
}