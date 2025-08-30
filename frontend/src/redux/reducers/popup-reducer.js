import {
  POPUP_VIEW_BUTTON_CLICKED,
  POPUP_CLOSE_BUTTON_CLICKED,
} from "../actions/types";

const initialState = {
  isOpen: false,
  cardId: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case POPUP_VIEW_BUTTON_CLICKED:
      return action.payload;
    case POPUP_CLOSE_BUTTON_CLICKED:
      return action.payload;
    default:
      return state;
  }
}
