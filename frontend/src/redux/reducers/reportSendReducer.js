import { REPORT_SEND_BUTTON_CLICKED } from "../actions/types";


export default function (values) {
    return {
        type: REPORT_SEND_BUTTON_CLICKED,
        payload: values,
    }
};

