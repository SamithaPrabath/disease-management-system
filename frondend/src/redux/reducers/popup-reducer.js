import { POPUP_VIEW_BUTTON_CLICKED } from "../actions/types";
import { POPUP_CLOSE_BUTTON_CLICKED } from "../actions/types";

export default function(state=null, action){
    switch(action.type){
        case POPUP_VIEW_BUTTON_CLICKED:
            return action.payload;
            break;
        case POPUP_CLOSE_BUTTON_CLICKED:
            return action.payload;
            break;
    }
    return state
}