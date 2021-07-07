import { createContext } from 'react';
import { loginUser } from 'actions';

const AuthContext = createContext(null);

export function AuthProvider(props) {
  const logIn = async (formData) => {
    const { data } = await loginUser(formData);
    return data.token;
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
