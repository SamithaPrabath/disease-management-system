import { VIEW_ASSIGN_MOH_BUTTON_CLICKED, VIEW_ASSIGN_MOH_BUTTON_CLOSE_BUTTON_CLICKED } from "./types";

export const viewAssignMOHPopUp = () => {
    return{
      type: VIEW_ASSIGN_MOH_BUTTON_CLICKED,
      payload: true,
    }
  };
  
  export const closeAssignMOHPopUp = () => {
  return{
    type: VIEW_ASSIGN_MOH_BUTTON_CLOSE_BUTTON_CLICKED,
    payload: false,
  }
  };