import axios from 'axios';
import { extractApiErrors } from 'utils/helpers';

const BASE_URL = '/api/v1/users/';

export function registerUser(userData) {
  return axios
    .post(BASE_URL + 'register', userData)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
}
