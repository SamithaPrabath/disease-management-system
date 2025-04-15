import { VIEW_EDIT_EVENT_BUTTON_CLICKED, VIEW_EDIT_EVENT_CLOSE_BUTTON_CLICKED } from "../actions/types";

export default function(state=null, action){
    switch(action.type){
        case VIEW_EDIT_EVENT_BUTTON_CLICKED:
            return action.payload;
            break;
        case VIEW_EDIT_EVENT_CLOSE_BUTTON_CLICKED:
            return action.payload;
            break;
    }
    return state
}