import { FETCH_RENTALS, CREATE_RENTAL } from '../../actions';

export function rentals(state = [], action) {
  switch (action.type) {
    case FETCH_RENTALS:
      return action.rentals;
    case CREATE_RENTAL:
      return [...state, action.rental];
    default:
      return state;
  }
}
