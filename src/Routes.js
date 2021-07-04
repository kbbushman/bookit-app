import { Switch, Route } from 'react-router-dom';
import HomePage from 'pages/HomePage';
import LoginPage from 'pages/LoginPage';
import RegisterPage from 'pages/RegisterPage';
import RentalDetailPage from 'pages/RentalDetailPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/login">
        <LoginPage />
      </Route>
      <Route path="/register">
        <RegisterPage />
      </Route>
      <Route path="/rentals/:id">
        <RentalDetailPage />
      </Route>
    </Switch>
  );
}

export default Routes;
