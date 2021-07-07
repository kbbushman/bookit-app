import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { loginUser } from 'actions';
import { USER_AUTHENTICATED, USER_LOGGED_OUT } from 'actions/actionTypes';

const AuthContext = createContext(null);

export function AuthProvider(props) {
  const dispatch = useDispatch();
  const TOKEN_ITEM = 'bi_token';

  function getToken() {
    return localStorage.getItem(TOKEN_ITEM);
  }

  function decodeToken(token) {
    return jwt.decode(token);
  }

  function tokenNotExpired(exp) {
    return Date.now() < exp * 1000;
  }

  function isValidToken(token) {
    const decodedToken = decodeToken(token);
    return decodedToken && tokenNotExpired(decodedToken.exp);
  }

  function isAuthenticated() {
    const token = getToken();
    return token && isValidToken(token);
  }

  function checkAuthState() {
    if (isAuthenticated()) {
      const { username } = decodeToken(getToken());
      dispatch({ type: USER_AUTHENTICATED, username });
    }
  }

  async function logIn(formData) {
    const { token } = await loginUser(formData);
    localStorage.setItem(TOKEN_ITEM, token);
    const { username } = decodeToken(token);
    dispatch({ type: USER_AUTHENTICATED, username });
    return token;
  }

  function logOut() {
    localStorage.removeItem(TOKEN_ITEM);
    dispatch({ type: USER_LOGGED_OUT });
  }

  const authApi = { logIn, logOut, checkAuthState, isAuthenticated };

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
