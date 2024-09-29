import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getCostumes,
    getCostume,
    addCostume,
    updateCostume,
    deleteCostume
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Costume Sagas
function* fetchCostumesSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/costumes', payload));
        const costumes = response.data;
        yield put(getCostumes.success(costumes));
    } catch (error) {
        yield put(getCostumes.failure(error.message));
    }
}

function* fetchCostumeSaga(action) {
    try {
        const { id } = action.payload;
        const costume = yield call(() => axiosInstance.get(`/costumes/${id}`, action.payload));
        yield put(getCostume.success(costume.data));
    } catch (error) {
        yield put(getCostume.failure(error.message));
    }
}

function* addCostumeSaga(action) {
    try {
        const newCostume = yield call(() => axiosInstance.post('/costumes', action.payload));
        yield put(addCostume.success(newCostume.data));
    } catch (error) {
        yield put(addCostume.failure(error.message));
    }
}

function* updateCostumeSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedCostume = yield call(() => axiosInstance.post(`/costumes/${id}`, formData));
        yield put(updateCostume.success(updatedCostume.data));
    } catch (error) {
        yield put(updateCostume.failure(error.message));
    }
}

function* deleteCostumeSaga(action) {
    try {
        const { payload: costumeId } = action;
        yield call(() => axiosInstance.delete(`/costumes/${costumeId}`));
        yield put(deleteCostume.success(costumeId));
    } catch (error) {
        yield put(deleteCostume.failure(error.message));
    }
}

// Costume Watcher Saga
export function* costumeSaga() {
    yield takeLatest(getCostumes.request, fetchCostumesSaga);
    yield takeLatest(getCostume.request, fetchCostumeSaga);
    yield takeLatest(addCostume.request, addCostumeSaga);
    yield takeLatest(updateCostume.request, updateCostumeSaga);
    yield takeLatest(deleteCostume.request, deleteCostumeSaga);
}
