import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RentalFeatures from './RentalFeatures';
import { capitalize } from 'utils/helpers';

function RentalDetails({ rental }) {
  return (
    <div className="rental">
      <h2 className={`rental-type type-${rental.category}`}>
        {rental.shared && 'Shared'} {rental.category}
      </h2>
      {rental.owner && (
        <div className="rental-owner">
          <img
            src="https://api.hello-avatar.com/adorables/face/eyes5/nose2/mouth1/d68000/120"
            alt="owner"
          />
          <span>{rental.owner.username}</span>
        </div>
      )}
      <h1 className="rental-title">{rental.title}</h1>
      <h2 className="rental-city">{capitalize(rental.city)}</h2>
      <div className="rental-room-info">
        <span>
          <FontAwesomeIcon icon="building" />
          {rental.numOfRooms} bedrooms
        </span>
        <span>
          <FontAwesomeIcon icon="user" /> {rental.numOfRooms + 4} guests
        </span>
        <span>
          <FontAwesomeIcon icon="bed" /> {rental.numOfRooms + 2} beds
        </span>
      </div>
      <p className="rental-description">{rental.description}</p>
      <hr />
      <RentalFeatures />
    </div>
  );
}

export default RentalDetails;
