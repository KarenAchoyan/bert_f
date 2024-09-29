import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getGalleries,
    getGallery,
    addGallery,
    updateGallery,
    deleteGallery
} from './actions';
import axiosInstance from 'configs/axiosIntance';

// Gallery Sagas
function* fetchGalleriesSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/galleries', payload));
        const galleries = response.data;
        yield put(getGalleries.success(galleries));
    } catch (error) {
        yield put(getGalleries.failure(error.message));
    }
}

function* fetchGallerySaga(action) {
    try {
        const { id } = action.payload;
        const gallery = yield call(() => axiosInstance.get(`/galleries/${id}`, action.payload));
        yield put(getGallery.success(gallery.data));
    } catch (error) {
        yield put(getGallery.failure(error.message));
    }
}

function* addGallerySaga(action) {
    try {
        const newGallery = yield call(() => axiosInstance.post('/galleries', action.payload));
        yield put(addGallery.success(newGallery.data));
    } catch (error) {
        yield put(addGallery.failure(error.message));
    }
}

function* updateGallerySaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedGallery = yield call(() => axiosInstance.post(`/galleries/${id}`, formData));
        yield put(updateGallery.success(updatedGallery.data));
    } catch (error) {
        yield put(updateGallery.failure(error.message));
    }
}

function* deleteGallerySaga(action) {
    try {
        const { payload: galleryId } = action;
        yield call(() => axiosInstance.delete(`/galleries/${galleryId}`));
        yield put(deleteGallery.success(galleryId));
    } catch (error) {
        yield put(deleteGallery.failure(error.message));
    }
}

export function* gallerySaga() {
    yield takeLatest(getGalleries.request, fetchGalleriesSaga);
    yield takeLatest(getGallery.request, fetchGallerySaga);
    yield takeLatest(addGallery.request, addGallerySaga);
    yield takeLatest(updateGallery.request, updateGallerySaga);
    yield takeLatest(deleteGallery.request, deleteGallerySaga);
}