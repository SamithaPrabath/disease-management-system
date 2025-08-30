import { RESET_STORE } from "./log_out_actions";

const initialState = {
  // Define your initial state here
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_STORE:
      return initialState; // Reset state to initial state
    // ... other cases ...
    default:
      return state;
  }
};

export default rootReducer; 