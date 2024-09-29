import {handleActions} from 'redux-actions';
import {
    getSpeeches,
    getSpeech,
    addSpeech,
    updateSpeech,
    deleteSpeech
} from './actions';

const initialState = {
    speeches: [],
    selectedSpeech: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const speechReducer = handleActions(
    {
        [getSpeeches.request]: (state) => ({
            ...state,
            isFetching: true,
        }),
        [getSpeech.success]: (state, {payload}) => ({
            ...state,
            selectedSpeech: payload,
            isFetching: false,
        }),
        [getSpeeches.success]: (state, {payload}) => ({
            ...state,
            speeches: payload,
            isFetching: false,
        }),
        [updateSpeech.success]: (state, {payload}) => ({
            ...state,
            speeches: state.speeches.map((slide) =>
                slide.id === payload.id ? payload : slide
            ),
            isUpdating: true,
        }),

        [updateSpeech.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [addSpeech.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addSpeech.success]: (state) => ({
            ...state,
            isAdding: false,
        }),

        [addSpeech.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [deleteSpeech.success]: (state, {payload}) => ({
            ...state,
            speeches: state.speeches.filter((slide) => slide.id !== payload),
            isDeleting: false,
        }),

        [deleteSpeech.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
        [getSpeeches.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getSpeech.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
    },
    initialState
);

export default speechReducer;
