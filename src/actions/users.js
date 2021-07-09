import axiosService from 'services/AxiosService';
import { USER_AUTHENTICATED } from './actionTypes';
import { extractApiErrors } from 'utils/helpers';

const BASE_URL = '/users/';
const { biAxios } = axiosService;

export function registerUser(registerData) {
  return biAxios
    .post(BASE_URL + 'register', registerData)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
}

export function loginUser(loginData) {
  return biAxios
    .post(BASE_URL + 'login', loginData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || {})));
}
