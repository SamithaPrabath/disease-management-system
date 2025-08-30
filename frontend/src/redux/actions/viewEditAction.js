import { VIEW_EDIT_BUTTON_CLICKED, VIEW_EDIT_CLOSE_BUTTON_CLICKED } from "./types";

export const viewEdit = () => {
      return{
        type: VIEW_EDIT_BUTTON_CLICKED,
        payload: [true],
      }
  };

  export const closeViewEdit = (values) => {

    return{
      type: VIEW_EDIT_CLOSE_BUTTON_CLICKED,
      payload: [false,values],
    }
};