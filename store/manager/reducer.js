import { handleActions } from 'redux-actions';
import {
    getManagers,
    getManager,
    addManager,
    updateManager,
    deleteManager
} from './actions';

const initialState = {
    managers: [],  // Changed from 'galleries' to 'managers'
    selectedManager: null,  // Changed from 'selectedGallery' to 'selectedManager'
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const managerReducer = handleActions(
    {
        [getManagers.success]: (state, { payload }) => ({
            ...state,
            managers: payload,  // Updated to 'managers'
            isFetching: true,
        }),
        [getManager.success]: (state, { payload }) => ({
            ...state,
            selectedManager: payload,  // Updated to 'selectedManager'
            isFetching: false,
        }),
        [addManager.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addManager.success]: (state, { payload }) => ({
            ...state,
            managers: [...state.managers, payload],  // Updated to 'managers'
            isAdding: false,
        }),
        [updateManager.success]: (state, { payload }) => ({
            ...state,
            managers: state.managers.map((manager) =>
                manager.id === payload.id ? payload : manager  // Updated from 'gallery' to 'manager'
            ),
            isUpdating: false,
        }),
        [deleteManager.success]: (state, { payload }) => ({
            ...state,
            managers: state.managers.filter((manager) => manager.id !== payload),  // Updated to 'managers'
            isDeleting: false,
        }),
        [getManagers.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getManager.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addManager.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateManager.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteManager.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default managerReducer;
