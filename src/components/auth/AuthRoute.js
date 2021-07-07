import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

function AuthRoute({ component: Component, ...rest }) {
  const authService = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        authService.isAuthenticated() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}

export default AuthRoute;
