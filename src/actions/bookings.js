import axiosService from 'services/AxiosService';
import { extractApiErrors } from 'utils/helpers';
import {} from './actionTypes';

const BASE_URL = '/bookings';
const { biAxios } = axiosService;

export function createBooking(booking) {
  return biAxios
    .post(BASE_URL, booking)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response) || {}));
}

export function getBookings(rentalId) {
  return biAxios.get(`${BASE_URL}?rental=${rentalId}`).then((res) => res.data);
}
