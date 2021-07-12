import { combineReducers } from 'redux';

const initialState = { items: [], isLoading: false, errors: null };

function rentals(state = initialState, action) {
  switch (action.type) {
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
