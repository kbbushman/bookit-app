import axiosService from 'services/AxiosService';
import {
  FETCH_RENTALS,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAILURE,
  FETCH_ONE_RENTAL,
  FETCH_ONE_RENTAL_SUCCESS,
  FETCH_ONE_RENTAL_FAILURE,
} from './actionTypes';

const BASE_URL = '/rentals/';
const { biAxios } = axiosService;

export function fetchRentals() {
  return async function (dispatch) {
    dispatch({ type: FETCH_RENTALS });

    try {
      const { data } = await biAxios.get(BASE_URL);
      dispatch({ type: FETCH_RENTALS_SUCCESS, rentals: data });
    } catch (err) {
      dispatch({
        type: FETCH_RENTALS_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}

export function fetchOneRental(id) {
  return async function (dispatch) {
    dispatch({ type: FETCH_ONE_RENTAL });

    try {
      const { data } = await biAxios.get(BASE_URL + id);
      dispatch({ type: FETCH_ONE_RENTAL_SUCCESS, rental: data });
    } catch (err) {
      dispatch({
        type: FETCH_ONE_RENTAL_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}

export function createRental(rental) {
  return biAxios.post(BASE_URL, rental);
}
