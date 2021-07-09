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
  const {
    data: rental,
    isLoading,
    errors,
  } = useSelector((state) => state.rental);

  useEffect(() => {
    dispatch(fetchOneRental(id));
  }, [id, dispatch]);

  if (isLoading) return <h2>Loading...</h2>;

  if (errors) return <h2>{errors[0].message}</h2>;

  return (
    <section id="rentalDetails">
      <div className="upper-section">
        <RentalMedia rental={rental} />
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-8">
            <RentalDetails rental={rental} />
          </div>
          <div className="col-md-4">
            <Booking />
          </div>
        </div>
      </div>
    </section>
  );
}

export default RentalDetailPage;
