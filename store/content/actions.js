import { createAction } from 'redux-actions';

// Actions for Content CRUD
export const getContent = {
  request: createAction('GET_CONTENT_REQUEST'),
  success: createAction('GET_CONTENT_SUCCESS'),
  failure: createAction('GET_CONTENT_FAILURE'),
};

export const updateContent = {
  request: createAction('UPDATE_CONTENT_REQUEST'),
  success: createAction('UPDATE_CONTENT_SUCCESS'),
  failure: createAction('UPDATE_CONTENT_FAILURE'),
};
