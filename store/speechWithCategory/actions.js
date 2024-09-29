import { createAction } from 'redux-actions';

// Actions for fetching multiple speeches with categories
export const getSpeechesWithCategories = {
  request: createAction('GET_SPEECHES_WITH_CATEGORIES_REQUEST'),
  success: createAction('GET_SPEECHES_WITH_CATEGORIES_SUCCESS'),
  failure: createAction('GET_SPEECHES_WITH_CATEGORIES_FAILURE'),
};

export const getSpeechesWithCategoriesFilter = {
  request: createAction('GET_SPEECHES_WITH_CATEGORIES_FILTER_REQUEST'),
  success: createAction('GET_SPEECHES_WITH_CATEGORIES_FILTER_SUCCESS'),
  failure: createAction('GET_SPEECHES_WITH_CATEGORIES_FILTER_FAILURE'),
};

// Actions for fetching a single speech with category
export const getSpeechWithCategory = {
  request: createAction('GET_SPEECH_WITH_CATEGORY_REQUEST'),
  success: createAction('GET_SPEECH_WITH_CATEGORY_SUCCESS'),
  failure: createAction('GET_SPEECH_WITH_CATEGORY_FAILURE'),
};

// Actions for adding a new speech with category
export const addSpeechWithCategory = {
  request: createAction('ADD_SPEECH_WITH_CATEGORY_REQUEST'),
  success: createAction('ADD_SPEECH_WITH_CATEGORY_SUCCESS'),
  failure: createAction('ADD_SPEECH_WITH_CATEGORY_FAILURE'),
};

// Actions for updating an existing speech with category
export const updateSpeechWithCategory = {
  request: createAction('UPDATE_SPEECH_WITH_CATEGORY_REQUEST'),
  success: createAction('UPDATE_SPEECH_WITH_CATEGORY_SUCCESS'),
  failure: createAction('UPDATE_SPEECH_WITH_CATEGORY_FAILURE'),
};

// Actions for deleting a speech with category
export const deleteSpeechWithCategory = {
  request: createAction('DELETE_SPEECH_WITH_CATEGORY_REQUEST'),
  success: createAction('DELETE_SPEECH_WITH_CATEGORY_SUCCESS'),
  failure: createAction('DELETE_SPEECH_WITH_CATEGORY_FAILURE'),
};
