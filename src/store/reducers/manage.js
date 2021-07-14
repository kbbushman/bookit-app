import { combineReducers } from 'redux';
import {
  FETCH_USER_RENTALS,
  FETCH_USER_RENTALS_SUCCESS,
  FETCH_USER_RENTALS_FAILURE,
} from 'actions/actionTypes';

const initialState = { items: [], isLoading: false, errors: null };

function rentals(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_RENTALS:
      return { items: [], isLoading: true, errors: false };
    case FETCH_USER_RENTALS_SUCCESS:
      return { items: action.rentals, isLoading: false, errors: null };
    case FETCH_USER_RENTALS_FAILURE:
      return { items: [], isLoading: false, errors: action.errors };
    default:
      return state;
  }
}

function bookings(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

function receivedBookings(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export const manage = combineReducers({
  rentals,
  bookings,
  receivedBookings,
});
