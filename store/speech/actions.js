import { createAction } from 'redux-actions';

export const getSpeeches = {
  request: createAction('GET_SPEECHES_REQUEST'),
  success: createAction('GET_SPEECHES_SUCCESS'),
  failure: createAction('GET_SPEECHES_FAILURE'),
};

export const getSpeech = {
  request: createAction('GET_SPEECH_REQUEST'),
  success: createAction('GET_SPEECH_SUCCESS'),
  failure: createAction('GET_SPEECH_FAILURE'),
};

export const addSpeech = {
  request: createAction('ADD_SPEECH_REQUEST'),
  success: createAction('ADD_SPEECH_SUCCESS'),
  failure: createAction('ADD_SPEECH_FAILURE'),
};

export const updateSpeech = {
  request: createAction('UPDATE_SPEECH_REQUEST'),
  success: createAction('UPDATE_SPEECH_SUCCESS'),
  failure: createAction('UPDATE_SPEECH_FAILURE'),
};

export const deleteSpeech = {
  request: createAction('DELETE_SPEECH_REQUEST'),
  success: createAction('DELETE_SPEECH_SUCCESS'),
  failure: createAction('DELETE_SPEECH_FAILURE'),
};
