import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RentalFeatures() {
  return (
    <div className="rental-assets">
      <h3 className="title">Features</h3>
      <div className="row">
        <div className="col-md-6">
          <span>
            <FontAwesomeIcon icon="asterisk" /> Cooling
          </span>
          <span>
            <FontAwesomeIcon icon="fire" /> Heating
          </span>
          <span>
            <FontAwesomeIcon icon="location-arrow" /> Iron
          </span>
        </div>
        <div className="col-md-6">
          <span>
            <FontAwesomeIcon icon="desktop" /> Working area
          </span>
          <span>
            <FontAwesomeIcon icon="soap" /> Washing machine
          </span>
          <span>
            <FontAwesomeIcon icon="archive" /> Dishwasher
          </span>
        </div>
      </div>
    </div>
  );
}

export default RentalFeatures;
