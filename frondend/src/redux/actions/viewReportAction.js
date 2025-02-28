import { VIEW_REPORT_BUTTON_CLICKED, VIEW_REPORT_CLOSE_BUTTON_CLICKED } from "./types";

export const viewReport = (values) => {
      return{
        type: VIEW_REPORT_BUTTON_CLICKED,
        payload: [true, values],
      }
  };

  export const closeViewReport = () => {

    return{
      type: VIEW_REPORT_CLOSE_BUTTON_CLICKED,
      payload: false,
    }
};