import { handleActions } from 'redux-actions';
import {
    getSpeechCategories,
    getSpeechCategory,
    addSpeechCategory,
    updateSpeechCategory,
    deleteSpeechCategory
} from './actions';

const initialState = {
    speechCategories: [], // Renamed to match new entity
    selectedSpeechCategory: null, // Renamed to match new entity
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const speechCategoryReducer = handleActions(
    {
        [getSpeechCategories.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getSpeechCategory.success]: (state, { payload }) => ({
            ...state,
            selectedSpeechCategory: payload,
            isFetching: false,
        }),
        [getSpeechCategories.success]: (state, { payload }) => ({
            ...state,
            speechCategories: payload,
            isFetching: false,
        }),
        [updateSpeechCategory.success]: (state, { payload }) => ({
            ...state,
            speechCategories: state.speechCategories.map((category) =>
                category.id === payload.id ? payload : category
            ),
            isUpdating: true,
        }),
        [updateSpeechCategory.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [addSpeechCategory.success]: (state, { payload }) => ({
            ...state,
            speechCategories: [
                ...state.speechCategories,
                payload,
            ],
            isAdding: false,
        }),
        [addSpeechCategory.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [deleteSpeechCategory.success]: (state, { payload }) => ({
            ...state,
            speechCategories: state.speechCategories.filter((category) => category.id !== payload),
            isDeleting: false,
        }),
        [deleteSpeechCategory.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
        [getSpeechCategories.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getSpeechCategory.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
    },
    initialState
);

export default speechCategoryReducer;
