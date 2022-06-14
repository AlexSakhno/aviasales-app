import { combineReducers } from 'redux';

function filter(
  state = {
    ALL: true,
    '0_TRANS': true,
    '1_TRANS': true,
    '2_TRANS': true,
    '3_TRANS': true,
  },
  action
) {
  let newFilter = { ...state };
  let checkAllFilters;

  switch (action.type) {
    case 'CHANGE_FILTER':
      newFilter = { ...state, [action.change]: !state[action.change] };
      checkAllFilters = Object.values(newFilter).slice(1).includes(false);
      return { ...newFilter, ALL: !checkAllFilters };

    case 'CHANGE_FILTER_ALL':
      for (const key in newFilter) {
        newFilter[key] = !state.ALL;
      }
      return newFilter;

    default:
      return state;
  }
}

function sort(state = 'CHEAP', action) {
  switch (action.type) {
    case 'CHANGE_SORT':
      return action.change;

    default:
      return state;
  }
}

function tickets(
  state = {
    isLoading: false,
    loadComplete: false,
    items: [],
  },
  action
) {
  switch (action.type) {
    case 'RECEIVE_TICKETS':
      return {
        ...state,
        items: [...state.items, ...action.data.tickets],
        loadComplete: action.data.stop,
        isLoading: false,
      };

    case 'REQUEST_TICKETS':
      return { ...state, isLoading: true };

    default:
      return state;
  }
}

function searchID(state = '', action) {
  switch (action.type) {
    case 'SET_SEARCH_ID':
      return action.id;

    default:
      return state;
  }
}

const reducer = combineReducers({
  filter,
  sort,
  tickets,
  searchID,
});

export default reducer;
