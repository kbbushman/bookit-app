import { createContext, useContext } from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { logInUser, logOutUser, userAuthenticated } from 'actions';

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
      dispatch(userAuthenticated(username));
    }
  }

  async function logIn(formData) {
    const { token } = await logInUser(formData);
    localStorage.setItem(TOKEN_ITEM, token);
    const { username } = decodeToken(token);
    dispatch(userAuthenticated(username));
    return token;
  }

  function logOut() {
    localStorage.removeItem(TOKEN_ITEM);
    dispatch(logOutUser());
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
