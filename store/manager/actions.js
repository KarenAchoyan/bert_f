import { createAction } from 'redux-actions';

// Actions for Managers CRUD
export const getManagers = {
  request: createAction('GET_MANAGERS_REQUEST'),
  success: createAction('GET_MANAGERS_SUCCESS'),
  failure: createAction('GET_MANAGERS_FAILURE'),
};

export const getManager = {
  request: createAction('GET_MANAGER_REQUEST'),
  success: createAction('GET_MANAGER_SUCCESS'),
  failure: createAction('GET_MANAGER_FAILURE'),
};

export const addManager = {
  request: createAction('ADD_MANAGER_REQUEST'),
  success: createAction('ADD_MANAGER_SUCCESS'),
  failure: createAction('ADD_MANAGER_FAILURE'),
};

export const updateManager = {
  request: createAction('UPDATE_MANAGER_REQUEST'),
  success: createAction('UPDATE_MANAGER_SUCCESS'),
  failure: createAction('UPDATE_MANAGER_FAILURE'),
};

export const deleteManager = {
  request: createAction('DELETE_MANAGER_REQUEST'),
  success: createAction('DELETE_MANAGER_SUCCESS'),
  failure: createAction('DELETE_MANAGER_FAILURE'),
};
