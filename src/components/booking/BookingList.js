import { Link } from 'react-router-dom';
import { capitalize } from 'utils/helpers';
import ApiErrors from '../forms/ApiErrors';

function BookingList({
  bookings,
  type,
  title,
  handleDeleteBooking,
  isLoading,
  errors,
}) {
  return (
    <section className="booking-listing">
      <h1 className="page-title">{title}</h1>
      {errors && <ApiErrors errors={errors} />}
      {!isLoading && !bookings.length && (
        <p className="alert alert-warning">No bookings created</p>
      )}
      <div className="row">
        {bookings.map((booking) => (
          <div key={booking._id} className="col-md-4">
            <div className="card text-center">
              {type === 'received' && (
                <div className="card-header">From: {booking.user.username}</div>
              )}
              <div className="card-block">
                <h4 className="card-title">
                  {booking.rental.title} - {capitalize(booking.rental.city)}{' '}
                </h4>
                <p className="card-text booking-days">
                  {new Date(booking.startDate).toLocaleDateString()} -{' '}
                  {new Date(booking.endDate).toLocaleDateString()} |{' '}
                  {booking.nights} nights
                </p>
                <p className="card-text">
                  <span>Price: </span>{' '}
                  <span className="booking-price-value">${booking.price}</span>
                </p>
                <button
                  className="btn btn-danger me-3"
                  onClick={() => handleDeleteBooking(booking._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/rentals/${booking.rental._id}`}
                  className="btn btn-bi-form"
                >
                  Go to Rental
                </Link>
              </div>
              <div className="card-footer text-muted">
                Created on {new Date(booking.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default BookingList;
