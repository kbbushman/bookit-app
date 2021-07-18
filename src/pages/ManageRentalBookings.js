import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingList from 'components/booking/BookingList';
import { fetcReceivedBookings } from 'actions';

function ManageRentalBookings() {
  const dispatch = useDispatch();
  const {
    items: bookings,
    isLoading,
    errors,
  } = useSelector((state) => state.manage.receivedBookings);

  useEffect(() => {
    dispatch(fetcReceivedBookings());
  }, [dispatch]);

  return (
    <div>
      <BookingList
        isLoading={isLoading}
        errors={errors}
        bookings={bookings}
        type="received"
        title={'Manage Received Bookings'}
      />
    </div>
  );
}

export default ManageRentalBookings;
