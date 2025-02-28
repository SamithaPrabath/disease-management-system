import {
    VIEW_UN_ASSIGN_CASE_BUTTON_CLICKED, VIEW_UN_ASSIGN_CASE_BUTTON_CLOSE_BUTTON_CLICKED
  } from "../actions/types";

  export default function (state = null, action) {
    switch (action.type) {
      case VIEW_UN_ASSIGN_CASE_BUTTON_CLICKED:
        return action.payload;
        break;
      case VIEW_UN_ASSIGN_CASE_BUTTON_CLOSE_BUTTON_CLICKED:
        return action.payload;
        break;
    }
    return state;
  }
  