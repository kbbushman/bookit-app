import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function RentalSearch() {
  const history = useHistory();
  const [location, setLocation] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    location ? history.push(`/rentals/search/${location}`) : history.push('/');
  }

  return (
    <form className="d-flex">
      <input
        className="form-control me-2"
        type="search"
        placeholder={`Try "San Francisco"`}
        aria-label="Search"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <button className="btn btn-bi-main" type="submit" onClick={handleSubmit}>
        Search
      </button>
    </form>
  );
}

export default RentalSearch;
