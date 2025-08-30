import { VIEW_EDIT_EPIDEMIOLOGY_USER } from '../actions/viewEditEpidemiologyUserAction';

const initialState = [];

const viewEditEpidemiologyUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case VIEW_EDIT_EPIDEMIOLOGY_USER:
      return [action.payload];
    default:
      return state;
  }
};

export default viewEditEpidemiologyUserReducer; 