import { VIEW_REPORT_BUTTON_CLICKED, VIEW_REPORT_CLOSE_BUTTON_CLICKED } from "./types";

export const viewReport = () => {
      return{
        type: VIEW_REPORT_BUTTON_CLICKED,
        payload: true,
      }
  };

  export const closeViewReport = () => {

    return{
      type: VIEW_REPORT_CLOSE_BUTTON_CLICKED,
      payload: false,
    }
};