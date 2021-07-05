import axios from 'axios';
import * as actionTypes from './actionTypes';

const BASE_URL = '/api/v1/rentals/';

export function fetchRentals() {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(BASE_URL);
      dispatch({
        type: actionTypes.FETCH_RENTALS,
        rentals: data,
      });
    } catch (err) {
      // TODO: Handle error
    }
  };
}

export function fetchOneRental(id) {
  return async function (dispatch) {
    try {
      const { data } = await axios.get(BASE_URL + id);
      dispatch({
        type: actionTypes.FETCH_ONE_RENTAL,
        rental: data,
      });
    } catch (err) {
      // TODO: Handle error
    }
  };
}

export function createRental(rental) {
  return {
    type: actionTypes.CREATE_RENTAL,
    rental,
  };
}
