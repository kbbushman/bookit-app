import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookingList from 'components/booking/BookingList';
import { fetchUserBookings } from 'actions';

function ManageBookings() {
  const dispatch = useDispatch();
  const { items: bookings } = useSelector((state) => state.manage.bookings);

  console.log(bookings);

  useEffect(() => {
    dispatch(fetchUserBookings());
  }, [dispatch]);

  return (
    <div>
      <h1>Manage Bookings</h1>
      <BookingList />
    </div>
  );
}

export default ManageBookings;
