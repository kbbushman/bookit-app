import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RentalCard from 'components/rental/RentalCard';
import { deleteRental, fetchUserRentals } from 'actions';
import ApiErrors from '../components/forms/ApiErrors';

function ManageRentals() {
  const dispatch = useDispatch();
  const {
    items: rentals,
    isLoading,
    errors,
  } = useSelector((state) => state.manage.rentals);

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
          <>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteRental(rental._id)}
            >
              Delete
            </button>
            <Link
              to={`/rentals/${rental._id}/edit`}
              className="btn btn-warning ms-2"
            >
              Edit
            </Link>
          </>
        )}
      />
    ));
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Manage Your Rentals</h1>
      {errors && <ApiErrors errors={errors} />}
      <div className="row">{renderRentals()}</div>
      {!isLoading && !rentals.length && (
        <p className="alert alert-warning">
          You have not created any rentals yet
        </p>
      )}
    </div>
  );
}

export default ManageRentals;
