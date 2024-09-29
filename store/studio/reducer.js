import { handleActions } from 'redux-actions';
import {
    getStudioImages,
    getStudioImage,
    addStudioImage,
    updateStudioImage,
    deleteStudioImage
} from './actions';

const initialState = {
    studioImages: [], // Renamed from 'costumes' to 'studioImages'
    selectedStudioImage: null, // Renamed from 'selectedCostume'
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const studioImageReducer = handleActions(
    {
        [getStudioImages.request]: (state, { payload }) => ({
            ...state,
            isFetching: true,
        }),
        [getStudioImages.success]: (state, { payload }) => ({
            ...state,
            studioImages: payload, // Renamed from 'costumes' to 'studioImages'
            isFetching: false,
        }),
        [getStudioImage.success]: (state, { payload }) => ({
            ...state,
            selectedStudioImage: payload, // Renamed from 'selectedCostume'
            isFetching: false,
        }),
        [addStudioImage.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addStudioImage.success]: (state, { payload }) => ({
            ...state,
            studioImages: [...state.studioImages, payload], // Updated to 'studioImages'
            isAdding: false,
        }),
        [updateStudioImage.success]: (state, { payload }) => ({
            ...state,
            studioImages: state.studioImages.map((studioImage) =>
                studioImage.id === payload.id ? payload : studioImage // Renamed from 'costume' to 'studioImage'
            ),
            isUpdating: false,
        }),
        [deleteStudioImage.success]: (state, { payload }) => ({
            ...state,
            studioImages: state.studioImages.filter((studioImage) => studioImage.id !== payload), // Updated to 'studioImages'
            isDeleting: false,
        }),
        [getStudioImages.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getStudioImage.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addStudioImage.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateStudioImage.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteStudioImage.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default studioImageReducer;
