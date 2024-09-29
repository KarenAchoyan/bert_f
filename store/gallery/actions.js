import { createAction } from 'redux-actions';

// Actions for Galleries CRUD
export const getGalleries = {
  request: createAction('GET_GALLERIES_REQUEST'),
  success: createAction('GET_GALLERIES_SUCCESS'),
  failure: createAction('GET_GALLERIES_FAILURE'),
};
export const getGalleriesLimit = {
  request: createAction('GET_GALLERIES_LIMIT_REQUEST'),
  success: createAction('GET_GALLERIES_LIMIT_SUCCESS'),
  failure: createAction('GET_GALLERIES_LIMIT_FAILURE'),
};

export const getGallery = {
  request: createAction('GET_GALLERY_REQUEST'),
  success: createAction('GET_GALLERY_SUCCESS'),
  failure: createAction('GET_GALLERY_FAILURE'),
};

export const addGallery = {
  request: createAction('ADD_GALLERY_REQUEST'),
  success: createAction('ADD_GALLERY_SUCCESS'),
  failure: createAction('ADD_GALLERY_FAILURE'),
};

export const updateGallery = {
  request: createAction('UPDATE_GALLERY_REQUEST'),
  success: createAction('UPDATE_GALLERY_SUCCESS'),
  failure: createAction('UPDATE_GALLERY_FAILURE'),
};

export const deleteGallery = {
  request: createAction('DELETE_GALLERY_REQUEST'),
  success: createAction('DELETE_GALLERY_SUCCESS'),
  failure: createAction('DELETE_GALLERY_FAILURE'),
};
