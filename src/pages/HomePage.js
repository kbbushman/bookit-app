import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import { fetchRentals } from 'actions';

function HomePage() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals.data);

  useEffect(() => {
    dispatch(fetchRentals());
  }, [dispatch]);

  const renderRentals = () => {
    return rentals.map((rental) => (
      <RentalCard key={rental._id} rental={rental} />
    ));
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Your Home All Around the World</h1>
      <div className="row">{renderRentals()}</div>
    </div>
  );
}

export default HomePage;
