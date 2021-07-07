import axios from 'axios';
import { extractApiErrors } from 'utils/helpers';

const BASE_URL = '/api/v1/users/';

export function registerUser(registerData) {
  return axios
    .post(BASE_URL + 'register', registerData)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
}

export function loginUser(loginData) {
  return axios
    .post(BASE_URL + 'login', loginData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
}
