import { createAction } from 'redux-actions';

// Actions for Costumes CRUD
export const getCostumes = {
  request: createAction('GET_COSTUMES_REQUEST'),
  success: createAction('GET_COSTUMES_SUCCESS'),
  failure: createAction('GET_COSTUMES_FAILURE'),
};

export const getCostume = {
  request: createAction('GET_COSTUME_REQUEST'),
  success: createAction('GET_COSTUME_SUCCESS'),
  failure: createAction('GET_COSTUME_FAILURE'),
};

export const addCostume = {
  request: createAction('ADD_COSTUME_REQUEST'),
  success: createAction('ADD_COSTUME_SUCCESS'),
  failure: createAction('ADD_COSTUME_FAILURE'),
};

export const updateCostume = {
  request: createAction('UPDATE_COSTUME_REQUEST'),
  success: createAction('UPDATE_COSTUME_SUCCESS'),
  failure: createAction('UPDATE_COSTUME_FAILURE'),
};

export const deleteCostume = {
  request: createAction('DELETE_COSTUME_REQUEST'),
  success: createAction('DELETE_COSTUME_SUCCESS'),
  failure: createAction('DELETE_COSTUME_FAILURE'),
};
