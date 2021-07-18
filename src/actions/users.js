import axiosService from 'services/AxiosService';
import { USER_AUTHENTICATED, USER_LOGGED_OUT } from './actionTypes';
import { extractApiErrors } from 'utils/helpers';

const BASE_URL = '/users/';
const { biAxios } = axiosService;

export function registerUser(registerData) {
  return biAxios
    .post(BASE_URL + 'register', registerData)
    .catch((err) => Promise.reject(extractApiErrors(err.response || [])));
}

export function logInUser(loginData) {
  return biAxios
    .post(BASE_URL + 'login', loginData)
    .then((res) => res.data)
    .catch((err) => Promise.reject(extractApiErrors(err.response || [])));
}

export function logOutUser() {
  return { type: USER_LOGGED_OUT };
}

export function userAuthenticated(username) {
  return { type: USER_AUTHENTICATED, username };
}
