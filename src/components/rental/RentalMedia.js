import TomMap from '../map/TomMap';

function RentalMedia({ rental }) {
  function getLocation() {
    const { street, city } = rental;
    return street && city && city + ', ' + street;
  }

  return (
    <div className="row">
      <div className="col-md-6">
        <img src={rental.image} alt={rental.title} />
      </div>
      <div className="col-md-6">
        <TomMap location={getLocation()} />
      </div>
    </div>
  );
}

export default RentalMedia;
