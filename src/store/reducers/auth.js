import { USER_AUTHENTICATED } from 'actions/actionTypes';

const initialState = { isAuth: false, username: null };

export function auth(state = initialState, action) {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { isAuth: true, username: action.username };
    default:
      return state;
  }
}
