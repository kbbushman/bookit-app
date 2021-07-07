import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import RentalDetailPage from 'pages/RentalDetailPage';
import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';

function ProtectedPage() {
  return (
    <div>
      <h1>Protected Page</h1>
    </div>
  );
}

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <GuestRoute path="/login" component={LoginPage} />
      <GuestRoute path="/register" component={RegisterPage} />
      <Route path="/rentals/:id" component={RentalDetailPage} />
      <AuthRoute path="/protected" component={ProtectedPage} />
    </Switch>
  );
}

export default Routes;
