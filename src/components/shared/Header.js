import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RentalSearch from '../rental/RentalSearch';

function Header({ logOut }) {
  const { isAuth, username } = useSelector((state) => state.auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          BookIt
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <RentalSearch />

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {isAuth && (
              <li className="nav-item">
                <div className="nav-link">Welcome {username}</div>
              </li>
            )}
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" exact to="/">
                Home
              </NavLink>
            </li>
            {isAuth && (
              <>
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    to="/manage"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Manage
                  </span>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/rentals/new">
                        Add Rental
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/rentals/manage">
                        My Rentals
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/bookings/manage">
                        My Bookings
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="dropdown-item"
                        to="/bookings/received"
                      >
                        Received Bookings
                      </NavLink>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <div className="nav-link" onClick={logOut}>
                    Log Out
                  </div>
                </li>
              </>
            )}
            {!isAuth && (
              <>
                <li className="nav-item">
                  <NavLink className="nav-link" aria-current="page" to="/login">
                    Log In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link"
                    aria-current="page"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
