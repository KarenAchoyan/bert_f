import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getSpeechCategory,
    getSpeechCategories,
    addSpeechCategory,
    updateSpeechCategory,
    deleteSpeechCategory,
} from './actions';
import axiosInstance from 'configs/axiosIntance'; // Ensure correct import path

function* fetchSpeechCategoriesSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/speech-categories', payload));
        const categories = response.data;
        yield put(getSpeechCategories.success(categories));
    } catch (error) {
        yield put(getSpeechCategories.failure(error.message));
    }
}

function* fetchSpeechCategorySaga(action) {
    try {
        const { id } = action.payload;
        const response = yield call(() => axiosInstance.get(`/speech-categories/${id}`));
        const category = response.data;
        yield put(getSpeechCategory.success(category));
    } catch (error) {
        yield put(getSpeechCategory.failure(error.message));
    }
}

function* addSpeechCategorySaga(action) {
    try {
        const newCategory = yield call(() => axiosInstance.post('/speech-categories', action.payload));
        yield put(addSpeechCategory.success(newCategory.data));
    } catch (error) {
        yield put(addSpeechCategory.failure(error.message));
    }
}

function* updateSpeechCategorySaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedCategory = yield call(() => axiosInstance.put(`/speech-categories/${id}`, formData));
        yield put(updateSpeechCategory.success(updatedCategory.data));
    } catch (error) {
        yield put(updateSpeechCategory.failure(error.message));
    }
}

function* deleteSpeechCategorySaga(action) {
    try {
        const { payload: id } = action;
        yield call(() => axiosInstance.delete(`/speech-categories/${id.id}`));
        yield put(deleteSpeechCategory.success(id.id));
    } catch (error) {
        yield put(deleteSpeechCategory.failure(error.message));
    }
}

export function* speechCategorySaga() {
    yield takeLatest(getSpeechCategories.request, fetchSpeechCategoriesSaga);
    yield takeLatest(getSpeechCategory.request, fetchSpeechCategorySaga);
    yield takeLatest(addSpeechCategory.request, addSpeechCategorySaga);
    yield takeLatest(updateSpeechCategory.request, updateSpeechCategorySaga);
    yield takeLatest(deleteSpeechCategory.request, deleteSpeechCategorySaga);
}
