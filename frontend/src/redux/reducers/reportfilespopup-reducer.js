import {
  VIEW_REPORT_FILES_BUTTON_CLICKED,
  VIEW_REPORT_FILES_CLOSE_BUTTON_CLICKED,
} from "../actions/types";

export default function (state = null, action) {
  switch (action.type) {
    case VIEW_REPORT_FILES_BUTTON_CLICKED:
      return action.payload;
    case VIEW_REPORT_FILES_CLOSE_BUTTON_CLICKED:
      return action.payload;
  }
  return state;
} 