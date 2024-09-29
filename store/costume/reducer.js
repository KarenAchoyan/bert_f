import { handleActions } from 'redux-actions';
import {
    getCostumes,
    getCostume,
    addCostume,
    updateCostume,
    deleteCostume
} from './actions';

const initialState = {
    costumes: [],
    selectedCostume: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const costumeReducer = handleActions(
    {
        [getCostumes.success]: (state, { payload }) => ({
            ...state,
            costumes: payload,
            isFetching: false,
        }),
        [getCostume.success]: (state, { payload }) => ({
            ...state,
            selectedCostume: payload,
            isFetching: false,
        }),
        [addCostume.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addCostume.success]: (state, { payload }) => ({
            ...state,
            costumes: [...state.costumes, payload],
            isAdding: false,
        }),
        [updateCostume.success]: (state, { payload }) => ({
            ...state,
            costumes: state.costumes.map((costume) =>
                costume.id === payload.id ? payload : costume
            ),
            isUpdating: false,
        }),
        [deleteCostume.success]: (state, { payload }) => ({
            ...state,
            costumes: state.costumes.filter((costume) => costume.id !== payload),
            isDeleting: false,
        }),
        [getCostumes.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getCostume.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addCostume.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateCostume.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteCostume.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default costumeReducer;
