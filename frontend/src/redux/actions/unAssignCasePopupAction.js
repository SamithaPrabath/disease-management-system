import { VIEW_UN_ASSIGN_CASE_BUTTON_CLICKED, VIEW_UN_ASSIGN_CASE_BUTTON_CLOSE_BUTTON_CLICKED } from "./types";

export const viewUnAssignCasePopUp = () => {
    return{
      type: VIEW_UN_ASSIGN_CASE_BUTTON_CLICKED,
      payload: true,
    }
  };
  
  export const closeUnAssignCasePopUp = () => {
  return{
    type: VIEW_UN_ASSIGN_CASE_BUTTON_CLOSE_BUTTON_CLICKED,
    payload: false,
  }
  };