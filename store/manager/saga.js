import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getManagers,
    getManager,
    addManager,
    updateManager,
    deleteManager
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Manager Sagas
function* fetchManagersSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/managers', payload));  // Updated endpoint
        const managers = response.data;
        yield put(getManagers.success(managers));  // Updated action
    } catch (error) {
        yield put(getManagers.failure(error.message));  // Updated action
    }
}

function* fetchManagerSaga(action) {
    try {
        const { id } = action.payload;
        const manager = yield call(() => axiosInstance.get(`/managers/${id}`, action.payload));  // Updated endpoint
        yield put(getManager.success(manager.data));  // Updated action
    } catch (error) {
        yield put(getManager.failure(error.message));  // Updated action
    }
}

function* addManagerSaga(action) {
    try {
        const newManager = yield call(() => axiosInstance.post('/managers', action.payload));  // Updated endpoint
        yield put(addManager.success(newManager.data));  // Updated action
    } catch (error) {
        yield put(addManager.failure(error.message));  // Updated action
    }
}

function* updateManagerSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedManager = yield call(() => axiosInstance.post(`/managers/${id}`, formData));  // Updated endpoint
        yield put(updateManager.success(updatedManager.data));  // Updated action
    } catch (error) {
        yield put(updateManager.failure(error.message));  // Updated action
    }
}

function* deleteManagerSaga(action) {
    try {
        const { payload: managerId } = action;
        yield call(() => axiosInstance.delete(`/managers/${managerId}`));  // Updated endpoint
        yield put(deleteManager.success(managerId));  // Updated action
    } catch (error) {
        yield put(deleteManager.failure(error.message));  // Updated action
    }
}

// Manager Watcher Sagas
export function* managerSaga() {
    yield takeLatest(getManagers.request, fetchManagersSaga);  // Updated action
    yield takeLatest(getManager.request, fetchManagerSaga);  // Updated action
    yield takeLatest(addManager.request, addManagerSaga);  // Updated action
    yield takeLatest(updateManager.request, updateManagerSaga);  // Updated action
    yield takeLatest(deleteManager.request, deleteManagerSaga);  // Updated action
}
