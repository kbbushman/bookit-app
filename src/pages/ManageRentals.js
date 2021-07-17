import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import { fetchUserRentals } from 'actions';

function ManageRentals() {
  const dispatch = useDispatch();
  const { items: rentals } = useSelector((state) => state.manage.rentals);

  useEffect(() => {
    dispatch(fetchUserRentals());
  }, [dispatch]);

  const renderRentals = () => {
    return rentals.map((rental) => (
      <RentalCard key={rental._id} rental={rental} />
    ));
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Manage Your Rentals</h1>
      <div className="row">{renderRentals()}</div>
    </div>
  );
}

export default ManageRentals;
