import { combineReducers } from 'redux';
import {
  FETCH_USER_RENTALS,
  FETCH_USER_RENTALS_SUCCESS,
  FETCH_USER_RENTALS_FAILURE,
  FETCH_USER_BOOKINGS,
  FETCH_USER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS_FAILURE,
  FETCH_OWNER_BOOKINGS,
  FETCH_OWNER_BOOKINGS_SUCCESS,
  FETCH_OWNER_BOOKINGS_FAILURE,
  DELETE_RENTAL,
  DELETE_RENTAL_SUCCESS,
  DELETE_RENTAL_FAILURE,
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
    case DELETE_RENTAL:
      return { items: [...state.items], isLoading: true, errors: null };
    case DELETE_RENTAL_SUCCESS:
      return {
        items: state.items.filter((item) => item._id !== action.id),
        isLoading: false,
        errors: null,
      };
    case DELETE_RENTAL_FAILURE:
      return {
        items: [...state.items],
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}

function bookings(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER_BOOKINGS:
      return { items: [], isLoading: true, errors: false };
    case FETCH_USER_BOOKINGS_SUCCESS:
      return { items: action.bookings, isLoading: false, errors: null };
    case FETCH_USER_BOOKINGS_FAILURE:
      return { items: [], isLoading: false, errors: action.errors };
    default:
      return state;
  }
}

function receivedBookings(state = initialState, action) {
  switch (action.type) {
    case FETCH_OWNER_BOOKINGS:
      return { items: [], isLoading: true, errors: false };
    case FETCH_OWNER_BOOKINGS_SUCCESS:
      return { items: action.bookings, isLoading: false, errors: null };
    case FETCH_OWNER_BOOKINGS_FAILURE:
      return { items: [], isLoading: false, errors: action.errors };
    default:
      return state;
  }
}

export const manage = combineReducers({
  rentals,
  bookings,
  receivedBookings,
});
