import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import { deleteRental, fetchUserRentals } from 'actions';

function ManageRentals() {
  const dispatch = useDispatch();
  const { items: rentals } = useSelector((state) => state.manage.rentals);

  useEffect(() => {
    dispatch(fetchUserRentals());
  }, [dispatch]);

  function handleDeleteRental(id) {
    const deleteConfirmed = window.confirm(
      'Are you sure you want to delete this rental?'
    );
    if (!deleteConfirmed) return;
    dispatch(deleteRental(id));
  }

  const renderRentals = () => {
    return rentals.map((rental) => (
      <RentalCard
        key={rental._id}
        rental={rental}
        renderMenu={() => (
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteRental(rental._id)}
          >
            Delete
          </button>
        )}
      />
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
