import { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { toast } from 'react-toastify';
import RentalMedia from 'components/rental/RentalMedia';
import RentalFeatures from 'components/rental/RentalFeatures';
import EditableInput from 'components/editable/EditableInput';
import EditableTextarea from 'components/editable/EditableTextarea';
import EditableSelect from 'components/editable/EditableSelect';
import ApiErrors from 'components/forms/ApiErrors';
import { fetchOneRental, verifyRentalOwner, updateRental } from 'actions';
import { capitalize } from 'utils/helpers';

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

  async function handleUpdateRental(rentalData, onSuccess, onError) {
    try {
      await dispatch(updateRental(id, rentalData));
      onSuccess();
    } catch (err) {
      toast.error(err[0].message, {
        autoClose: 4000,
      });
      onError();
    }
  }

  if (isLoading && !rental._id) return null;

  return (
    <section id="rentalDetails">
      {errors && <ApiErrors errors={errors} />}
      <div className="upper-section">
        <RentalMedia rental={rental} />
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-7 col-lg-7 col-xl-8">
            <div className="rental">
              <span className="rental-city">Shared? </span>
              <EditableSelect
                className={`rental-type type-${rental.category}`}
                field="shared"
                entity={rental}
                options={[true, false]}
                inline={true}
                handleUpdateRental={handleUpdateRental}
              />
              <EditableSelect
                className={`rental-type type-${rental.category}`}
                field="category"
                entity={rental}
                options={['apartment', 'condo', 'house']}
                handleUpdateRental={handleUpdateRental}
              />
              <EditableInput
                className="rental-title"
                field="title"
                entity={rental}
                handleUpdateRental={handleUpdateRental}
              />
              <EditableInput
                className="rental-city"
                field="city"
                entity={rental}
                transformView={(value) => capitalize(value)}
                handleUpdateRental={handleUpdateRental}
              />
              <EditableInput
                className="rental-street"
                field="street"
                entity={rental}
                transformView={(value) => capitalize(value)}
                handleUpdateRental={handleUpdateRental}
              />
              <div className="rental-room-info">
                <span>
                  <FontAwesomeIcon icon="building" className="me-1" />
                  <EditableInput
                    className="mr-0"
                    field="numOfRooms"
                    inline={true}
                    entity={rental}
                    handleUpdateRental={handleUpdateRental}
                  />{' '}
                  bedrooms
                </span>
                <span>
                  <FontAwesomeIcon icon="user" className="ms-3 me-1" />{' '}
                  {rental.numOfRooms + 4} guests
                </span>
                <span>
                  <FontAwesomeIcon icon="bed" className="ms-3 me-1" />{' '}
                  {rental.numOfRooms + 2} beds
                </span>
              </div>
              <EditableTextarea
                className="rental-description mr-0"
                field="description"
                entity={rental}
                rows={5}
                cols={70}
                handleUpdateRental={handleUpdateRental}
              />
              <hr />
              <RentalFeatures />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default withVerifyOwner(RentalEditPage);
