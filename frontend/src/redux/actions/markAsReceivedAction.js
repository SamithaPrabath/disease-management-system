import { MARK_AS_RECEIVED_BUTTON_CLICKED } from "./types";

export const markAsReceivedButtonClicked = (value) => {
    return {
        type: MARK_AS_RECEIVED_BUTTON_CLICKED,
        payload: value,
    };
};
