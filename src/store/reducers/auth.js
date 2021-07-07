import { USER_AUTHENTICATED, USER_LOGGED_OUT } from 'actions/actionTypes';

const initialState = { isAuth: false, username: null };

export function auth(state = initialState, action) {
  switch (action.type) {
    case USER_AUTHENTICATED:
      return { isAuth: true, username: action.username };
    case USER_LOGGED_OUT:
      return { isAuth: false, username: null };
    default:
      return state;
  }
}
