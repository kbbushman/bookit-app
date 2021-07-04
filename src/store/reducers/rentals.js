import { FETCH_RENTALS } from '../../actions';

export function rentals(state = [], action) {
  switch (action.type) {
    case FETCH_RENTALS:
      return action.rentals;
    default:
      return state;
  }
}
