import { MARK_AS_RECEIVED_BUTTON_CLICKED } from "../actions/types";

export default function (value) {
    return {
        type: MARK_AS_RECEIVED_BUTTON_CLICKED,
        payload: value,
    }
};



