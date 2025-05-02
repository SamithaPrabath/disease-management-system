import { VIEW_ADD_NEW_CASE_BUTTON_CLICKED, VIEW_ADD_NEW_CASE_CLOSE_BUTTON_CLICKED } from "./types";

export const viewAddNewCase = () => {
    return {
        type: VIEW_ADD_NEW_CASE_BUTTON_CLICKED,
        payload: true,
    };
};

export const closeAddNewCase = () => {
    return {
        type: VIEW_ADD_NEW_CASE_CLOSE_BUTTON_CLICKED,
        payload: false,
    };
};
