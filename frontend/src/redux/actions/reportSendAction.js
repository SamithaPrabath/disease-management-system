import { REPORT_SEND_BUTTON_CLICKED } from "./types";

export const reportSend = (values) => {
    return {
        type: REPORT_SEND_BUTTON_CLICKED,
        payload: values,
    }
};
