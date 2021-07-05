import * as actionTypes from 'actions/actionTypes';

export function rentals(state = [], action) {
  switch (action.type) {
    case actionTypes.FETCH_RENTALS:
      return action.rentals;
    case actionTypes.CREATE_RENTAL:
      return [...state, action.rental];
    default:
      return state;
  }
}
