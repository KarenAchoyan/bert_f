import {handleActions} from 'redux-actions';
import {
    getGalleries,
    getGallery,
    addGallery,
    updateGallery,
    deleteGallery
} from './actions';

const initialState = {
    galleries: [],
    selectedGallery: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};
const galleryReducer = handleActions(
    {
        [getGalleries.success]: (state, {payload}) => ({
            ...state,
            galleries: payload,
            isFetching: true,
        }),
        [getGallery.success]: (state, {payload}) => ({
            ...state,
            selectedGallery: payload,
            isFetching: false,
        }),
        [addGallery.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addGallery.success]: (state, {payload}) => ({
            ...state,
            galleries: [...state.galleries, payload],
            isAdding: false,
        }),
        [updateGallery.success]: (state, {payload}) => ({
            ...state,
            galleries: state.galleries.map((gallery) =>
                gallery.id === payload.id ? payload : gallery
            ),
            isUpdating: false,
        }),
        [deleteGallery.success]: (state, {payload}) => ({
            ...state,
            galleries: state.galleries.filter((gallery) => gallery.id !== payload),
            isDeleting: false,
        }),
        [getGalleries.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getGallery.failure]: (state, {payload}) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addGallery.failure]: (state, {payload}) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateGallery.failure]: (state, {payload}) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteGallery.failure]: (state, {payload}) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default galleryReducer;
