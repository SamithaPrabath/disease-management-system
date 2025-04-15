import { LOGIN_BUTTON_CLICKED } from "./types";
import { purgeStoredState } from 'redux-persist';

export const RESET_STORE = "RESET_STORE";

export const resetStore = () => (dispatch) => {
    // Clear the login state
    dispatch({
        type: LOGIN_BUTTON_CLICKED,
        payload: null
    });
    
    // Purge the persisted state
    purgeStoredState({ key: 'root' });
}; 