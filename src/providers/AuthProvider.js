import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { loginUser } from 'actions';
import { USER_AUTHENTICATED, USER_LOGGED_OUT } from 'actions/actionTypes';

const AuthContext = createContext(null);

export function AuthProvider(props) {
  const dispatch = useDispatch();

  function decodeToken(token) {
    return jwt.decode(token);
  }

  function checkAuthState() {
    const token = localStorage.getItem('bi_token');
    if (token) {
      const { username, exp } = decodeToken(token);
      if (Date.now() < exp * 1000) {
        dispatch({ type: USER_AUTHENTICATED, username });
      }
    }
  }

  async function logIn(formData) {
    const { token } = await loginUser(formData);
    localStorage.setItem('bi_token', token);
    const { username } = decodeToken(token);
    dispatch({ type: USER_AUTHENTICATED, username });
    return token;
  }

  function logOut() {
    localStorage.removeItem('bi_token');
    dispatch({ type: USER_LOGGED_OUT });
  }

  const authApi = { logIn, checkAuthState, logOut };

  return (
    <AuthContext.Provider value={authApi}>
      {props.children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function withAuth(Component) {
  return function (props) {
    return (
      <AuthContext.Consumer>
        {(authApi) => <Component {...props} auth={authApi} />}
      </AuthContext.Consumer>
    );
  };
}
