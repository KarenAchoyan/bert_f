import { handleActions } from 'redux-actions';
import {
    getContent,
    updateContent,
} from './actions';

const initialState = {
    content: null, // To store the fetched content
    isFetching: false, // For fetching state
    isUpdating: false, // For updating state
    error: null, // To store errors
};

const contentReducer = handleActions(
    {
        [getContent.request]: (state) => ({
            ...state,
            isFetching: true,
            error: null,
        }),
        [getContent.success]: (state, { payload }) => ({
            ...state,
            content: payload,
            isFetching: false,
        }),
        [getContent.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),

        [updateContent.request]: (state) => ({
            ...state,
            isUpdating: true,
            error: null, // Clear previous errors
        }),
        [updateContent.success]: (state, { payload }) => ({
            ...state,
            content: payload,
            isUpdating: false,
        }),
        [updateContent.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
    },
    initialState
);

export default contentReducer;
