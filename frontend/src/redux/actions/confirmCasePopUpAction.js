import { VIEW_CONFIRM_CASE_BUTTON_CLICKED, VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED } from "./types";

export const viewConfirmPopUp = (value) => {
  return {
    type: VIEW_CONFIRM_CASE_BUTTON_CLICKED,
    payload: [true, value],
  }
};

export const closeVIewConfirmPopUp = () => {
  return {
    type: VIEW_CONFIRM_CASE_CLOSE_BUTTON_CLICKED,
    payload: [false, null],
  }
};