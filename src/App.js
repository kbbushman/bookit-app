import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/shared/Header';
import Routes from 'Routes';
import { useAuth } from './providers/AuthProvider';

function App() {
  const authService = useAuth();

  useEffect(() => {
    authService.checkAuthState();
  }, [authService]);

  return (
    <Router>
      <Header logOut={authService.logOut} />
      <main className="container bi-container">
        <Routes />
      </main>
    </Router>
  );
}

export default App;
