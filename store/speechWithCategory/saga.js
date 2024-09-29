import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getSpeechesWithCategories,
    getSpeechWithCategory,
    addSpeechWithCategory,
    updateSpeechWithCategory,
    deleteSpeechWithCategory, getSpeechesWithCategoriesFilter,
} from './actions';
import axiosInstance from 'configs/axiosIntance'; // Ensure correct import path

function* fetchSpeechesWithCategoriesSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/speeches-with-categories', payload));
        const speeches = response.data;
        yield put(getSpeechesWithCategories.success(speeches));
    } catch (error) {
        yield put(getSpeechesWithCategories.failure(error.message));
    }
}

function* fetchSpeechesWithCategoriesFilterSaga(action) {
    try {
        const {id} = action.payload;

        const response = yield call(() => axiosInstance.get('/getFromCategory/' + id, action.payload));
        const speeches = response.data;
        yield put(getSpeechesWithCategoriesFilter.success(speeches));
    } catch (error) {
        yield put(getSpeechesWithCategoriesFilter.failure(error.message));
    }
}

function* fetchSpeechWithCategorySaga(action) {
    try {
        const {id} = action.payload;
        const response = yield call(() => axiosInstance.get(`/speeches-with-categories/${id}`));
        const speech = response.data;
        yield put(getSpeechWithCategory.success(speech));
    } catch (error) {
        yield put(getSpeechWithCategory.failure(error.message));
    }
}

function* addSpeechWithCategorySaga(action) {
    try {
        const newSpeech = yield call(() => axiosInstance.post('/speeches-with-categories', action.payload));
        yield put(addSpeechWithCategory.success(newSpeech.data));
    } catch (error) {
        yield put(addSpeechWithCategory.failure(error.message));
    }
}

function* updateSpeechWithCategorySaga(action) {
    try {
        const {id, formData} = action.payload;
        const updatedSpeech = yield call(() => axiosInstance.put(`/speeches-with-categories/${id}`, formData));
        yield put(updateSpeechWithCategory.success(updatedSpeech.data));
    } catch (error) {
        yield put(updateSpeechWithCategory.failure(error.message));
    }
}

function* deleteSpeechWithCategorySaga(action) {
    try {
        const {payload: id} = action;
        yield call(() => axiosInstance.delete(`/speeches-with-categories/${id.id}`));
        yield put(deleteSpeechWithCategory.success(id.id));
    } catch (error) {
        yield put(deleteSpeechWithCategory.failure(error.message));
    }
}

export function* speechWithCategorySaga() {
    yield takeLatest(getSpeechesWithCategories.request, fetchSpeechesWithCategoriesSaga);
    yield takeLatest(getSpeechWithCategory.request, fetchSpeechWithCategorySaga);
    yield takeLatest(addSpeechWithCategory.request, addSpeechWithCategorySaga);
    yield takeLatest(updateSpeechWithCategory.request, updateSpeechWithCategorySaga);
    yield takeLatest(deleteSpeechWithCategory.request, deleteSpeechWithCategorySaga);
    yield takeLatest(getSpeechesWithCategoriesFilter.request, fetchSpeechesWithCategoriesFilterSaga);
}
