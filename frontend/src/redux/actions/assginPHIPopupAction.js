import { VIEW_ASSIGN_PHI_BUTTON_CLICKED, VIEW_ASSIGN_PHI_BUTTON_CLOSE_BUTTON_CLICKED } from "./types";

export const viewAssignPHIPopUp = () => {
    return{
      type: VIEW_ASSIGN_PHI_BUTTON_CLICKED,
      payload: true,
    }
  };
  
  export const closeAssignPHIPopUp = () => {
  return{
    type: VIEW_ASSIGN_PHI_BUTTON_CLOSE_BUTTON_CLICKED,
    payload: false,
  }
  };