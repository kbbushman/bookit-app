import {
  FETCH_RENTALS,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAILURE,
  CREATE_RENTAL,
} from 'actions/actionTypes';

const initialState = { data: [], isLoading: false, errors: null };

export function rentals(state = initialState, action) {
  switch (action.type) {
    case FETCH_RENTALS:
      return { data: [], isLoading: true, errors: null };
    case FETCH_RENTALS_SUCCESS:
      return { data: action.rentals, isLoading: false, errors: null };
    case FETCH_RENTALS_FAILURE:
      return { data: [], isLoading: false, errors: action.errors };
    case CREATE_RENTAL:
      return {
        data: [...state.rentals, action.rental],
        isLoading: false,
        errors: null,
      };
    default:
      return state;
  }
}
