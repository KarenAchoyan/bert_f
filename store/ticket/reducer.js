import { handleActions } from 'redux-actions';
import {
    getTickets,
    getTicket,
    addTicket,
    updateTicket,
    deleteTicket,
} from './actions';

const initialState = {
    tickets: [],
    selectedTicket: null,
    isFetching: false,
    isAdding: false,
    isUpdating: false,
    isDeleting: false,
    error: null,
};

const ticketReducer = handleActions(
    {
        [getTickets.success]: (state, { payload }) => ({
            ...state,
            tickets: payload,
            isFetching: false,
        }),
        [getTicket.success]: (state, { payload }) => ({
            ...state,
            selectedTicket: payload,
            isFetching: false,
        }),
        [addTicket.request]: (state) => ({
            ...state,
            isAdding: true,
        }),
        [addTicket.success]: (state, { payload }) => ({
            ...state,
            tickets: [...state.tickets, payload],
            isAdding: false,
        }),
        [updateTicket.success]: (state, { payload }) => ({
            ...state,
            tickets: state.tickets.map((ticket) =>
                ticket.id === payload.id ? payload : ticket
            ),
            isUpdating: false,
        }),
        [deleteTicket.success]: (state, { payload }) => ({
            ...state,
            tickets: state.tickets.filter((ticket) => ticket.id !== payload),
            isDeleting: false,
        }),
        [getTickets.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [getTicket.failure]: (state, { payload }) => ({
            ...state,
            isFetching: false,
            error: payload,
        }),
        [addTicket.failure]: (state, { payload }) => ({
            ...state,
            isAdding: false,
            error: payload,
        }),
        [updateTicket.failure]: (state, { payload }) => ({
            ...state,
            isUpdating: false,
            error: payload,
        }),
        [deleteTicket.failure]: (state, { payload }) => ({
            ...state,
            isDeleting: false,
            error: payload,
        }),
    },
    initialState
);

export default ticketReducer;
