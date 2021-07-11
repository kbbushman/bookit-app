import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import { fetchRentals } from 'actions';
import { capitalize } from '../utils/helpers';

function RentalSearchPage() {
  const { location } = useParams();
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals.data);

  useEffect(() => {
    dispatch(fetchRentals(location));
  }, [dispatch, location]);

  const renderRentals = () => {
    return rentals.length ? (
      rentals.map((rental) => <RentalCard key={rental._id} rental={rental} />)
    ) : (
      <p className="alert alert-warning">No rentals found for {location}</p>
    );
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Results for {capitalize(location)}</h1>
      <div className="row">{renderRentals()}</div>
    </div>
  );
}

export default RentalSearchPage;
