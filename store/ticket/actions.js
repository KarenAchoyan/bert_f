import { createAction } from 'redux-actions';

// Actions for Tickets CRUD
export const getTickets = {
  request: createAction('GET_TICKETS_REQUEST'),
  success: createAction('GET_TICKETS_SUCCESS'),
  failure: createAction('GET_TICKETS_FAILURE'),
};

export const getTicket = {
  request: createAction('GET_TICKET_REQUEST'),
  success: createAction('GET_TICKET_SUCCESS'),
  failure: createAction('GET_TICKET_FAILURE'),
};

export const addTicket = {
  request: createAction('ADD_TICKET_REQUEST'),
  success: createAction('ADD_TICKET_SUCCESS'),
  failure: createAction('ADD_TICKET_FAILURE'),
};


export const updateTicket = {
  request: createAction('UPDATE_TICKET_REQUEST'),
  success: createAction('UPDATE_TICKET_SUCCESS'),
  failure: createAction('UPDATE_TICKET_FAILURE'),
};

export const deleteTicket = {
  request: createAction('DELETE_TICKET_REQUEST'),
  success: createAction('DELETE_TICKET_SUCCESS'),
  failure: createAction('DELETE_TICKET_FAILURE'),
};
