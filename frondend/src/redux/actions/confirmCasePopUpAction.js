import { VIEW_CONFIRM_CASE_BUTTON_CLICKED, VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED } from "./types";

export const viewConfirmPopUp = () => {
    return{
      type: VIEW_CONFIRM_CASE_BUTTON_CLICKED,
      payload: true,
    }
  };
  
  export const closeVIewConfirmPopUp = () => {
  return{
    type: VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED,
    payload: false,
  }
  };