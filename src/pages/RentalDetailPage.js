import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RentalDetails from 'components/rental/RentalDetails';
import RentalMedia from 'components/rental/RentalMedia';
import Booking from 'components/booking/Booking';
import { fetchOneRental } from 'actions';

function RentalDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const {
    data: rental,
    isLoading,
    errors,
  } = useSelector((state) => state.rental);

  useEffect(() => {
    dispatch(fetchOneRental(id));
  }, [id, dispatch]);

  if (isLoading || !rental._id) return null;

  if (errors) return <h2>{errors[0].message}</h2>;

  return (
    <section id="rentalDetails">
      <div className="upper-section">
        <RentalMedia rental={rental} />
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-7 col-lg-7 col-xl-8">
            <RentalDetails rental={rental} />
          </div>
          <div className="col-md-5 col-lg-5 col-xl-4">
            <Booking rental={rental} isAuth={isAuth} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalDetailPage;
