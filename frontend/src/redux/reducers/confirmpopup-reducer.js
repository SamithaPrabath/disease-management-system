import {
    VIEW_CONFIRM_CASE_BUTTON_CLICKED,
    VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED,
  } from "../actions/types";

  export default function (state = null, action) {
    switch (action.type) {
      case VIEW_CONFIRM_CASE_BUTTON_CLICKED:
        return action.payload;
        break;
      case VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED:
        return action.payload;
        break;
    }
    return state;
  }
  