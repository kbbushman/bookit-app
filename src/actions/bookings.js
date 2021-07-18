import axiosService from 'services/AxiosService';
import { extractApiErrors } from 'utils/helpers';
import {
  FETCH_OWNER_BOOKINGS,
  FETCH_OWNER_BOOKINGS_FAILURE,
  FETCH_OWNER_BOOKINGS_SUCCESS,
  FETCH_USER_BOOKINGS,
  FETCH_USER_BOOKINGS_FAILURE,
  FETCH_USER_BOOKINGS_SUCCESS,
} from './actionTypes';

const BASE_URL = '/bookings';
const { biAxios } = axiosService;

export function createBooking(booking) {
  return biAxios
    .post(BASE_URL, booking)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response) || []));
}

export function getBookings(rentalId) {
  return biAxios
    .get(`${BASE_URL}?rental=${rentalId}`)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response) || []));
}

export function fetchUserBookings() {
  return async function (dispatch) {
    dispatch({ type: FETCH_USER_BOOKINGS });

    try {
      const { data } = await biAxios.get(BASE_URL + '/me');
      dispatch({ type: FETCH_USER_BOOKINGS_SUCCESS, bookings: data });
    } catch (err) {
      dispatch({
        type: FETCH_USER_BOOKINGS_FAILURE,
        errors: extractApiErrors(err.response || []),
      });
    }
  };
}

export function fetcReceivedBookings() {
  return async function (dispatch) {
    dispatch({ type: FETCH_OWNER_BOOKINGS });

    try {
      const { data } = await biAxios.get(BASE_URL + '/owner');
      dispatch({ type: FETCH_OWNER_BOOKINGS_SUCCESS, bookings: data });
    } catch (err) {
      dispatch({
        type: FETCH_OWNER_BOOKINGS_FAILURE,
        errors: extractApiErrors(err.response || []),
      });
    }
  };
}
