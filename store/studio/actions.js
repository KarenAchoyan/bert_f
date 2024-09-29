import { createAction } from 'redux-actions';

// Actions for Studio Images CRUD
export const getStudioImages = {
  request: createAction('GET_STUDIO_IMAGES_REQUEST'),
  success: createAction('GET_STUDIO_IMAGES_SUCCESS'),
  failure: createAction('GET_STUDIO_IMAGES_FAILURE'),
};

export const getStudioImage = {
  request: createAction('GET_STUDIO_IMAGE_REQUEST'),
  success: createAction('GET_STUDIO_IMAGE_SUCCESS'),
  failure: createAction('GET_STUDIO_IMAGE_FAILURE'),
};

export const addStudioImage = {
  request: createAction('ADD_STUDIO_IMAGE_REQUEST'),
  success: createAction('ADD_STUDIO_IMAGE_SUCCESS'),
  failure: createAction('ADD_STUDIO_IMAGE_FAILURE'),
};

export const updateStudioImage = {
  request: createAction('UPDATE_STUDIO_IMAGE_REQUEST'),
  success: createAction('UPDATE_STUDIO_IMAGE_SUCCESS'),
  failure: createAction('UPDATE_STUDIO_IMAGE_FAILURE'),
};

export const deleteStudioImage = {
  request: createAction('DELETE_STUDIO_IMAGE_REQUEST'),
  success: createAction('DELETE_STUDIO_IMAGE_SUCCESS'),
  failure: createAction('DELETE_STUDIO_IMAGE_FAILURE'),
};
