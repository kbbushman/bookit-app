import {
  FETCH_ONE_RENTAL,
  FETCH_ONE_RENTAL_SUCCESS,
  FETCH_ONE_RENTAL_FAILURE,
} from 'actions/actionTypes';

const initialState = { data: {}, isLoading: false, errors: null };

export function rental(state = initialState, action) {
  switch (action.type) {
    case FETCH_ONE_RENTAL:
      return { data: {}, isLoading: true, errors: null };
    case FETCH_ONE_RENTAL_SUCCESS:
      return { data: action.rental, isLoading: false, errors: null };
    case FETCH_ONE_RENTAL_FAILURE:
      return { data: {}, isLoading: false, errors: action.errors };
    default:
      return state;
  }
}
