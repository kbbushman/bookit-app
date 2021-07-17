import axiosService from 'services/AxiosService';
import {
  FETCH_RENTALS,
  FETCH_RENTALS_SUCCESS,
  FETCH_RENTALS_FAILURE,
  FETCH_ONE_RENTAL,
  FETCH_ONE_RENTAL_SUCCESS,
  FETCH_ONE_RENTAL_FAILURE,
  FETCH_USER_RENTALS,
  FETCH_USER_RENTALS_SUCCESS,
  FETCH_USER_RENTALS_FAILURE,
  DELETE_RENTAL,
  DELETE_RENTAL_SUCCESS,
  DELETE_RENTAL_FAILURE,
} from './actionTypes';

const BASE_URL = '/rentals/';
const { biAxios } = axiosService;

export function fetchRentals(location) {
  return async function (dispatch) {
    const url = location ? `/rentals?city=${location}` : BASE_URL;

    dispatch({ type: FETCH_RENTALS });

    try {
      const { data } = await biAxios.get(url);
      dispatch({ type: FETCH_RENTALS_SUCCESS, rentals: data });
    } catch (err) {
      dispatch({
        type: FETCH_RENTALS_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}

export function fetchUserRentals() {
  return async function (dispatch) {
    dispatch({ type: FETCH_USER_RENTALS });

    try {
      const { data } = await biAxios.get(BASE_URL + 'me');
      dispatch({ type: FETCH_USER_RENTALS_SUCCESS, rentals: data });
    } catch (err) {
      dispatch({
        type: FETCH_USER_RENTALS_FAILURE,
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

export function deleteRental(id) {
  return async function (dispatch) {
    dispatch({ type: DELETE_RENTAL });

    try {
      await biAxios.delete(BASE_URL + id);
      dispatch({ type: DELETE_RENTAL_SUCCESS, id });
    } catch (err) {
      dispatch({
        type: DELETE_RENTAL_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}
