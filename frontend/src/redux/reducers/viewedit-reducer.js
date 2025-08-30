import { VIEW_EDIT_BUTTON_CLICKED } from "../actions/types";
import { VIEW_EDIT_CLOSE_BUTTON_CLICKED } from "../actions/types";

export default function(state=null, action){
    switch(action.type){
        case VIEW_EDIT_BUTTON_CLICKED:
            return action.payload;
            break;
        case VIEW_EDIT_CLOSE_BUTTON_CLICKED:
            return action.payload;
            break;
    }
    return state
}