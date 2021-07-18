import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingList from 'components/booking/BookingList';
import { fetchUserBookings, deleteBooking } from 'actions';

function ManageBookings() {
  const dispatch = useDispatch();
  const {
    items: bookings,
    isLoading,
    errors,
  } = useSelector((state) => state.manage.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  function handleDeleteBooking(id) {
    const deleteConfirmed = window.confirm(
      'Are you sure you want to delete this booking?'
    );
    if (!deleteConfirmed) return;
    dispatch(deleteBooking(id));
  }

  return (
    <div>
      <BookingList
        bookings={bookings}
        isLoading={isLoading}
        errors={errors}
        title={'Manage Bookings'}
        handleDeleteBooking={handleDeleteBooking}
      />
    </div>
  );
}

export default ManageBookings;
