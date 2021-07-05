import * as actionTypes from 'actions/actionTypes';

const initialState = { data: [], isLoading: false, errors: null };

export function rentals(state = initialState, action) {
  switch (action.type) {
    case actionTypes.FETCH_RENTALS:
      return { data: [], isLoading: true, errors: null };
    case actionTypes.FETCH_RENTALS_SUCCESS:
      return { data: action.rentals, isLoading: false, errors: null };
    case actionTypes.FETCH_RENTALS_FAILURE:
      return { data: [], isLoading: false, errors: action.errors };
    case actionTypes.CREATE_RENTAL:
      return {
        data: [...state.rentals, action.rental],
        isLoading: false,
        errors: null,
      };
    default:
      return state;
  }
}
