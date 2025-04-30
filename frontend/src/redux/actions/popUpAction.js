import { POPUP_VIEW_BUTTON_CLICKED, POPUP_CLOSE_BUTTON_CLICKED } from "./types";

export const openPopUp = (cardId) => {
  return {
    type: POPUP_VIEW_BUTTON_CLICKED,
    payload: {
      isOpen: true,
      cardId: cardId
    },
  }
};

export const closePopUp = () => {
  return {
    type: POPUP_CLOSE_BUTTON_CLICKED,
    payload: {
      isOpen: false,
      cardId: null
    },
  }
};

