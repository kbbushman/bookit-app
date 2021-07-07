import { createContext } from 'react';
import { useDispatch } from 'react-redux';
import jwt from 'jsonwebtoken';
import { loginUser } from 'actions';
import { USER_AUTHENTICATED } from 'actions/actionTypes';

const AuthContext = createContext(null);

export function AuthProvider(props) {
  const dispatch = useDispatch();

  function decodeToken(token) {
    return jwt.decode(token);
  }

  const logIn = async (formData) => {
    const { token } = await loginUser(formData);
    localStorage.setItem('bi_token', token);
    const decodedToken = decodeToken(token);
    console.log(decodedToken);
    dispatch({ type: USER_AUTHENTICATED, username: decodedToken.username });
    return token;
  };

  const authApi = { logIn };

  return (
    <AuthContext.Provider value={authApi}>
      {props.children}
    </AuthContext.Provider>
  );
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
