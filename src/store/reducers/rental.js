import { FETCH_ONE_RENTAL } from '../../actions';

export function rental(state = {}, action) {
  switch (action.type) {
    case FETCH_ONE_RENTAL:
      return action.rental;
    default:
      return state;
  }
}
