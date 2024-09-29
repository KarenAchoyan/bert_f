import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getStudioImages,
    getStudioImage,
    addStudioImage,
    updateStudioImage,
    deleteStudioImage
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchStudioImagesSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/studio-images', payload)); // Updated endpoint
        const studioImages = response.data;
        yield put(getStudioImages.success(studioImages)); // Updated action
    } catch (error) {
        yield put(getStudioImages.failure(error.message)); // Updated action
    }
}

function* fetchStudioImageSaga(action) {
    try {
        const { id } = action.payload;
        const studioImage = yield call(() => axiosInstance.get(`/studio-images/${id}`, action.payload)); // Updated endpoint
        yield put(getStudioImage.success(studioImage.data)); // Updated action
    } catch (error) {
        yield put(getStudioImage.failure(error.message)); // Updated action
    }
}

function* addStudioImageSaga(action) {
    try {
        const newStudioImage = yield call(() => axiosInstance.post('/studio-images', action.payload)); // Updated endpoint
        yield put(addStudioImage.success(newStudioImage.data)); // Updated action
    } catch (error) {
        yield put(addStudioImage.failure(error.message)); // Updated action
    }
}

function* updateStudioImageSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedStudioImage = yield call(() => axiosInstance.post(`/studio-images/${id}`, formData)); // Updated endpoint
        yield put(updateStudioImage.success(updatedStudioImage.data)); // Updated action
    } catch (error) {
        yield put(updateStudioImage.failure(error.message)); // Updated action
    }
}

function* deleteStudioImageSaga(action) {
    try {
        const { payload: studioImageId } = action;
        yield call(() => axiosInstance.delete(`/studio-images/${studioImageId}`)); // Updated endpoint
        yield put(deleteStudioImage.success(studioImageId)); // Updated action
    } catch (error) {
        yield put(deleteStudioImage.failure(error.message)); // Updated action
    }
}

// Studio Image Watcher Saga
export function* studioImageSaga() {
    yield takeLatest(getStudioImages.request, fetchStudioImagesSaga); // Updated watcher
    yield takeLatest(getStudioImage.request, fetchStudioImageSaga); // Updated watcher
    yield takeLatest(addStudioImage.request, addStudioImageSaga); // Updated watcher
    yield takeLatest(updateStudioImage.request, updateStudioImageSaga); // Updated watcher
    yield takeLatest(deleteStudioImage.request, deleteStudioImageSaga); // Updated watcher
}
