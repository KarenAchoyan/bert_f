import {takeLatest, call, put} from 'redux-saga/effects';
import {
    getSpeech,
    getSpeeches,
    addSpeech,
    updateSpeech,
    deleteSpeech,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Slide Sagas
function* fetchSpeechesSaga({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/speeches', payload));
        const slides = response.data;
        yield put(getSpeeches.success(slides));
    } catch (error) {
        yield put(getSpeeches.failure(error.message));
    }
}

function* fetchSlideSaga(action) {
    try {
        const {id} = action.payload;
        const slide = yield call(() => axiosInstance.get(`/speeches/${id}`, action.payload));
        yield put(getSpeech.success(slide));
    } catch (error) {
        yield put(getSpeech.failure(error.message));
    }
}
function* addSlideSaga(action) {
    try {
        const newSlide = yield call(() => axiosInstance.post('/speeches', action.payload));
        yield put(addSpeech.success(newSlide));
    } catch (error) {
        yield put(addSpeech.failure(error.message));
    }
}

function* updateSlideSaga(action) {
    try {
        const {id, formData} = action.payload;
        const updatedSlide = yield call(() => axiosInstance.post(`/speeches/${id}`, formData));
        yield put(updatedSlide.success(updatedSlide.data));
    } catch (error) {
        yield put(updateSpeech.failure(error.message));
    }
}

function* deleteSlideSaga(action) {
    try {
        const {payload: slideId} = action;
        yield call(() => axiosInstance.delete(`/speeches/${slideId}`));
        yield put(deleteSpeech.success(slideId));
    } catch (error) {
        yield put(deleteSpeech.failure(error.message));
    }
}

export function* speechSaga() {
    yield takeLatest(getSpeeches.request, fetchSpeechesSaga);
    yield takeLatest(getSpeech.request, fetchSlideSaga);
    yield takeLatest(addSpeech.request, addSlideSaga);
    yield takeLatest(updateSpeech.request, updateSlideSaga);
    yield takeLatest(deleteSpeech.request, deleteSlideSaga);
}
