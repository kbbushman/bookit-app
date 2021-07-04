import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOneRental } from '../actions';

function RentalDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const rental = useSelector((state) => state.rental);

  useEffect(() => {
    dispatch(fetchOneRental(id));
  }, [id, dispatch]);

  return (
    <section id="rentalDetails">
      <div className="upper-section">
        <div className="row">
          <div className="col-md-6">
            <img src={rental.image} alt={rental.title} />
          </div>
          <div className="col-md-6">
            {/* <!-- TODO: Display Rental Map --> */}
            <img src={rental.image} alt={rental.title} />
          </div>
        </div>
      </div>

      <div className="details-section">
        <div className="row">
          <div className="col-md-8">
            <div className="rental">
              <h2 className={`rental-type type-${rental.category}`}>
                {rental.shared && 'Shared'} {rental.category}
              </h2>
              <h1 className="rental-title">{rental.title}</h1>
              <h2 className="rental-city">{rental.city}</h2>
              <div className="rental-room-info">
                <span>
                  <i className="fa fa-building"></i>
                  {rental.numOfRooms} bedrooms
                </span>
                <span>
                  <i className="fa fa-user"></i> {rental.numOfRooms + 4} guests
                </span>
                <span>
                  <i className="fa fa-bed"></i> {rental.numOfRooms + 2} beds
                </span>
              </div>
              <p className="rental-description">{rental.description}</p>
              <hr />
              <div className="rental-assets">
                <h3 className="title">Assets</h3>
                <div className="row">
                  <div className="col-md-6">
                    <span>
                      <i className="fa fa-asterisk"></i> Cooling
                    </span>
                    <span>
                      <i className="fa fa-thermometer"></i> Heating
                    </span>
                    <span>
                      <i className="fa fa-location-arrow"></i> Iron
                    </span>
                  </div>
                  <div className="col-md-6">
                    <span>
                      <i className="fa fa-desktop"></i> Working area
                    </span>
                    <span>
                      <i className="fa fa-cube"></i> Washing machine
                    </span>
                    <span>
                      <i className="fa fa-cube"></i> Dishwasher
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4"> BOOKING</div>
        </div>
      </div>
    </section>
  );
}

export default RentalDetailPage;
