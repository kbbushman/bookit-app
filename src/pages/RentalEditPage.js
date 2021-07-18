import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RentalDetails from 'components/rental/RentalDetails';
import RentalMedia from 'components/rental/RentalMedia';
import { fetchOneRental, verifyRentalOwner } from 'actions';

function withVerifyOwner(Component) {
  return function (props) {
    const { id } = useParams();
    const [isVerified, setIsVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      verifyRentalOwner(id)
        .then(() => {
          setIsVerified(true);
          setIsLoading(false);
        })
        .catch((err) => {
          setIsVerified(false);
          setIsLoading(false);
        });
    }, [id]);

    if (!isVerified && !isLoading) {
      return <Redirect to="/" />;
    }

    return <Component {...props} />;
  };
}

function RentalEditPage() {
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

  if (isLoading || !rental._id) return null;

  if (errors) return <h2>{errors[0].message}</h2>;

  return (
    <section id="rentalDetails">
      <h1>Rental Edit</h1>
      <div className="upper-section">
        <RentalMedia rental={rental} />
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-7 col-lg-7 col-xl-8">
            <RentalDetails rental={rental} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default withVerifyOwner(RentalEditPage);
