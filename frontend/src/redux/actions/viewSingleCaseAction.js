import { VIEW_SINGLE_CASE_BUTTON_CLICKED, VIEW_SINGLE_CASE_CLOSE_BUTTON_CLICKED } from "./types";

export const viewSingleCase = (values) => {
      return{
        type: VIEW_SINGLE_CASE_BUTTON_CLICKED,
        payload: [true, values],
      }
  };

  export const closeSingleCase = () => {

    return{
      type: VIEW_SINGLE_CASE_CLOSE_BUTTON_CLICKED,
      payload: false,
    }
};