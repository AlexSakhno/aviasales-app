import ApiService from '../services/api-service';

const apiService = new ApiService();

export const changeFilter = (change) => ({ type: 'CHANGE_FILTER', change });
export const changeFilterAll = () => ({ type: 'CHANGE_FILTER_ALL' });
export const changeSort = (change) => ({ type: 'CHANGE_SORT', change });
const setSearchID = (id) => ({ type: 'SET_SEARCH_ID', id });
const requestTickets = () => ({ type: 'REQUEST_TICKETS' });
const receiveTickets = (data) => ({ type: 'RECEIVE_TICKETS', data });
export const getSearchID = () => (dispatch) => apiService.getSearchId().then((id) => dispatch(setSearchID(id)));
export const getTickets = (id) => (dispatch) => {
  dispatch(requestTickets());
  return apiService
    .getTicketsPack(id)
    .then((data) => dispatch(receiveTickets(data)))
    .catch(() => dispatch(receiveTickets({ tickets: [], stop: false })));
};
