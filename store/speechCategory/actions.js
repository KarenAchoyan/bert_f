import { createAction } from 'redux-actions';

export const getSpeechCategories = {
  request: createAction('GET_SPEECH_CATEGORIES_REQUEST'),
  success: createAction('GET_SPEECH_CATEGORIES_SUCCESS'),
  failure: createAction('GET_SPEECH_CATEGORIES_FAILURE'),
};

export const getSpeechCategory = {
  request: createAction('GET_SPEECH_CATEGORY_REQUEST'),
  success: createAction('GET_SPEECH_CATEGORY_SUCCESS'),
  failure: createAction('GET_SPEECH_CATEGORY_FAILURE'),
};

export const addSpeechCategory = {
  request: createAction('ADD_SPEECH_CATEGORY_REQUEST'),
  success: createAction('ADD_SPEECH_CATEGORY_SUCCESS'),
  failure: createAction('ADD_SPEECH_CATEGORY_FAILURE'),
};

export const updateSpeechCategory = {
  request: createAction('UPDATE_SPEECH_CATEGORY_REQUEST'),
  success: createAction('UPDATE_SPEECH_CATEGORY_SUCCESS'),
  failure: createAction('UPDATE_SPEECH_CATEGORY_FAILURE'),
};

export const deleteSpeechCategory = {
  request: createAction('DELETE_SPEECH_CATEGORY_REQUEST'),
  success: createAction('DELETE_SPEECH_CATEGORY_SUCCESS'),
  failure: createAction('DELETE_SPEECH_CATEGORY_FAILURE'),
};
