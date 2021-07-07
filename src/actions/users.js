import axios from 'axios';

const BASE_URL = '/api/v1/users/';

export function registerUser(userData) {
  return axios.post(BASE_URL + 'register', userData);
}
