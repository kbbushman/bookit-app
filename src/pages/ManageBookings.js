import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingList from 'components/booking/BookingList';
import { fetchUserBookings } from 'actions';

function ManageBookings() {
  const dispatch = useDispatch();
  const { items: bookings } = useSelector((state) => state.manage.bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <div>
      <BookingList bookings={bookings} title={'Manage Bookings'} />
    </div>
  );
}

export default ManageBookings;
