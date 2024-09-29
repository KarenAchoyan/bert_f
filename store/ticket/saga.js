import { takeLatest, call, put } from 'redux-saga/effects';
import {
    getTickets,
    getTicket,
    addTicket,
    updateTicket,
    deleteTicket,
} from './actions';
import axiosInstance from 'configs/axiosIntance';

function* fetchTicketsSaga({ payload = {} }) {
    try {
        const response = yield call(() => axiosInstance.get('/tickets', payload));
        const tickets = response.data;
        yield put(getTickets.success(tickets));
    } catch (error) {
        yield put(getTickets.failure(error.message));
    }
}

function* fetchTicketSaga(action) {
    try {
        const { id } = action.payload;
        const ticket = yield call(() => axiosInstance.get(`/tickets/${id}`, action.payload));
        yield put(getTicket.success(ticket.data));
    } catch (error) {
        yield put(getTicket.failure(error.message));
    }
}


function* addTicketSaga(action) {
    try {
        const newTicket = yield call(() => axiosInstance.post('/tickets', action.payload));
        yield put(addTicket.success(newTicket.data));
    } catch (error) {
        yield put(addTicket.failure(error.message));
    }
}

function* updateTicketSaga(action) {
    try {
        const { id, formData } = action.payload;
        const updatedTicket = yield call(() => axiosInstance.post(`/tickets/${id}`, formData));
        yield put(updateTicket.success(updatedTicket.data));
    } catch (error) {
        yield put(updateTicket.failure(error.message));
    }
}

function* deleteTicketSaga(action) {
    try {
        const { payload: ticketId } = action;
        yield call(() => axiosInstance.delete(`/tickets/${ticketId}`));
        yield put(deleteTicket.success(ticketId));
    } catch (error) {
        yield put(deleteTicket.failure(error.message));
    }
}

export function* ticketSaga() {
    yield takeLatest(getTickets.request, fetchTicketsSaga);
    yield takeLatest(getTicket.request, fetchTicketSaga);
    yield takeLatest(addTicket.request, addTicketSaga);
    yield takeLatest(updateTicket.request, updateTicketSaga);
    yield takeLatest(deleteTicket.request, deleteTicketSaga);
}
