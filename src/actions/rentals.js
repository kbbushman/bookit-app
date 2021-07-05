import axios from 'axios';
import * as actionTypes from './actionTypes';

const BASE_URL = '/api/v1/rentals/';

export function fetchRentals() {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.FETCH_RENTALS,
    });

    try {
      const { data } = await axios.get(BASE_URL);
      dispatch({
        type: actionTypes.FETCH_RENTALS_SUCCESS,
        rentals: data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_RENTALS_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}

export function fetchOneRental(id) {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.FETCH_ONE_RENTAL,
    });

    try {
      const { data } = await axios.get(BASE_URL + id);
      dispatch({
        type: actionTypes.FETCH_ONE_RENTAL_SUCCESS,
        rental: data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.FETCH_ONE_RENTAL_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}

export function createRental(rental) {
  return async function (dispatch) {
    dispatch({
      type: actionTypes.CREATE_RENTAL,
    });

    try {
      const { data } = await axios.post(BASE_URL, rental);
      dispatch({
        type: actionTypes.CREATE_RENTAL_SUCCESS,
        rental: data,
      });
    } catch (err) {
      dispatch({
        type: actionTypes.CREATE_RENTAL_FAILURE,
        errors: err.response.data.errors || err.message,
      });
    }
  };
}
