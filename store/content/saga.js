import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getContent,
    updateContent,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchContentSaga(action) {
    try {
        const { id } = action.payload;
        const response = yield call(() => axiosInstance.get(`/get-costume/${id}`));
        yield put(getContent.success(response.data));
    } catch (error) {
        yield put(getContent.failure(error.message));
    }
}

// Saga to update content
function* updateContentSaga(action) {
    try {
        const { id, formData } = action.payload;
        const response = yield call(() => axiosInstance.post(`/update-costume/${id}`, formData));
        yield put(updateContent.success(response.data.data));
    } catch (error) {
        yield put(updateContent.failure(error.message));
    }
}

export function* contentSaga() {
    yield takeLatest(getContent.request, fetchContentSaga);
    yield takeLatest(updateContent.request, updateContentSaga);
}
