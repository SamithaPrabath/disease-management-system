// Action Types
export const VIEW_EDIT_EPIDEMIOLOGY_USER = 'VIEW_EDIT_EPIDEMIOLOGY_USER';

// Action Creators
export const viewEditEpidemiologyUser = (viewEdit) => {
  return {
    type: VIEW_EDIT_EPIDEMIOLOGY_USER,
    payload: viewEdit,
  };
}; 