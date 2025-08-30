import { 
  FETCH_PASSWORD_RESET_REQUESTS, 
  APPROVE_PASSWORD_RESET_REQUEST, 
  REJECT_PASSWORD_RESET_REQUEST 
} from "../actions/types";

const initialState = {
  loading: false,
  data: [],
  error: null,
  message: null,
  status: null
};

export default function(state = initialState, action) {
  switch(action.type) {
    case FETCH_PASSWORD_RESET_REQUESTS:
      return {
        ...state,
        loading: action.payload.loading || false,
        data: action.payload.data || [],
        error: action.payload.error || null,
        message: action.payload.message || null,
        status: action.payload.status || null
      };
    case APPROVE_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        // Update the request status if it was successful
        data: action.payload.status === 200 
          ? state.data.map(request => 
              request.id === action.payload.requestId 
                ? { ...request, status: 'Approved' } 
                : request
            )
          : state.data
      };
    case REJECT_PASSWORD_RESET_REQUEST:
      return {
        ...state,
        message: action.payload.message,
        status: action.payload.status,
        // Update the request status if it was successful
        data: action.payload.status === 200 
          ? state.data.map(request => 
              request.id === action.payload.requestId 
                ? { ...request, status: 'Rejected' } 
                : request
            )
          : state.data
      };
    default:
      return state;
  }
} 