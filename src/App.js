import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'components/shared/Header';
import Routes from 'Routes';

function App() {
  return (
    <Router>
      <Header />
      <main className="container bi-container">
        <Routes />
      </main>
    </Router>
  );
}

export default App;
