import { POPUP_VIEW_BUTTON_CLICKED } from "./types";
import { POPUP_CLOSE_BUTTON_CLICKED } from "./types";


export const openPopUp = () => {
      return{
        type: POPUP_VIEW_BUTTON_CLICKED,
        payload: true,
      }
  };

  export const closePopUp = () => {
    return{
      type: POPUP_CLOSE_BUTTON_CLICKED,
      payload: false,
    }
};