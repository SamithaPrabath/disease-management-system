import { VIEW_EDIT_EVENT_BUTTON_CLICKED, VIEW_EDIT_EVENT_CLOSE_BUTTON_CLICKED } from "./types";

export const viewEditEvent = (value) => {
      return{
        type: VIEW_EDIT_EVENT_BUTTON_CLICKED,
        payload: [true, value],
      }
  };

  export const closeViewEditEvent = () => {

    return{
      type: VIEW_EDIT_EVENT_CLOSE_BUTTON_CLICKED,
      payload: [false],
    }
};