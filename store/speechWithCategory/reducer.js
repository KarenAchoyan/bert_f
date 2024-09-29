import { handleActions } from 'redux-actions';
import {
    getSpeechesWithCategories,
    getSpeechWithCategory,
    addSpeechWithCategory,
    updateSpeechWithCategory,
    deleteSpeechWithCategory,
    getSpeechesWithCategoriesFilter
} from './actions';

const initialState = {
    speechesWithCategories: [],
    selectedSpeechWithCategory: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const speechWithCategoryReducer = handleActions(
    {
        [getSpeechesWithCategories.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getSpeechesWithCategoriesFilter.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getSpeechWithCategory.success]: (state, { payload }) => ({
            ...state,
            selectedSpeechWithCategory: payload,
            isFetching: false,
        }),
        [getSpeechesWithCategories.success]: (state, { payload }) => ({
            ...state,
            speechesWithCategories: payload,
            isFetching: false,
        }),
        [getSpeechesWithCategoriesFilter.success]: (state, { payload }) => ({
            ...state,
            speechesWithCategories: payload,
            isFetching: false,
        }),
        [updateSpeechWithCategory.success]: (state, { payload }) => ({
            ...state,

            isUpdating: true,
        }),
        [updateSpeechWithCategory.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [addSpeechWithCategory.request]: (state, { payload }) => ({
            ...state,
            isAdding: true,
        }),
        [addSpeechWithCategory.success]: (state, { payload }) => ({
            ...state,
            speechesWithCategories: [
                ...state.speechesWithCategories,
                payload,
            ],
            isAdding: false,
        }),
        [addSpeechWithCategory.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [deleteSpeechWithCategory.success]: (state, { payload }) => ({
            ...state,
            speechesWithCategories: state.speechesWithCategories.filter((speech) => speech.id !== payload),
            isDeleting: false,
        }),
        [deleteSpeechWithCategory.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
        [getSpeechesWithCategories.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getSpeechesWithCategoriesFilter.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getSpeechWithCategory.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
    },
    initialState
);

export default speechWithCategoryReducer;
