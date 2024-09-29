import {takeLatest, put, call} from 'redux-saga/effects';
import {
    getBlogs,
    getBlog,
    addBlog,
    updateBlog,
    deleteBlog,
} from './actions';
import axiosInstance from "configs/axiosIntance";


function* handleGetBlogs({payload = {}}) {
    try {
        const response = yield call(() => axiosInstance.get('/blogs', payload));
        const blogs = response.data;
        yield put(getBlogs.success(blogs));
    } catch (error) {
        yield put(getBlogs.failure(error.message));
    }
}

function* fetchBlogSaga(action) {
    try {
        const {id} = action.payload;
        const blog = yield call(() => axiosInstance.get(`/blogs/${id}`, action.payload));
        yield put(getBlog.success(blog));
    } catch (error) {
        yield put(getBlog.failure(error.message));
    }
}

function* handleAddBlog(action) {
    try {
        const newBlog = yield call(() => axiosInstance.post(`/blogs`, action.payload));
        yield put(addBlog.success(newBlog));
    } catch (error) {
    }
}

function* handleDeleteBlog(action) {
    try {
        const {payload: blogId} = action; // Extract the categoryId from the payload
        yield call(() => axiosInstance.delete(`/blogs/${blogId}`));
        yield put(deleteBlog.success(blogId));
    } catch (error) {
        yield put(deleteBlog.failure(error.message));
    }
}

function* handleUpdateBlog(action) {

    try {
        const {id,formData} = action.payload;
        const updatedBlog =yield call(() => axiosInstance.post(`/blogs/${id}`,formData));
        yield put(updateBlog.success(updatedBlog));
    } catch (error) {
        yield put(updateBlog.failure(error.message));
    }
}

export function* blogSaga() {
    yield takeLatest(getBlogs.request, handleGetBlogs);
    yield takeLatest(getBlog.request, fetchBlogSaga);
    yield takeLatest(addBlog.request, handleAddBlog);
    yield takeLatest(updateBlog.request, handleUpdateBlog);
    yield takeLatest(deleteBlog.request, handleDeleteBlog);
}
