import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import RentalDetailPage from 'pages/RentalDetailPage';
import AuthRoute from 'components/auth/AuthRoute';
import GuestRoute from 'components/auth/GuestRoute';
import RentalNewPage from 'pages/RentalNewPage';
import RentalSearchPage from 'pages/RentalSearchPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <GuestRoute path="/login" component={LoginPage} />
      <GuestRoute path="/register" component={RegisterPage} />
      <AuthRoute path="/rentals/new" component={RentalNewPage} />
      <Route path="/rentals/search/:location" component={RentalSearchPage} />
      <Route path="/rentals/:id" component={RentalDetailPage} />
    </Switch>
  );
}

export default Routes;
