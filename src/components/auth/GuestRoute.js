import { Route, Redirect } from 'react-router-dom';
import { useAuth } from 'providers/AuthProvider';

function GuestRoute({ component: Component, ...rest }) {
  const authService = useAuth();

  return (
    <Route
      {...rest}
      render={(props) =>
        !authService.isAuthenticated() ? (
          <Component {...rest} {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
}

export default GuestRoute;
