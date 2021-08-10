import TomMap from '../map/TomMap';

function RentalMedia({ rental }) {
  function getLocation() {
    const { street, city } = rental;
    return street && city && city + ', ' + street;
  }

  return (
    <div className="row">
      <div className="col-md-7 col-lg-7 col-xl-6 mb-4">
        <img src={rental.image.url} alt={rental.title} />
      </div>
      <div className="col-md-5 col-lg-5 col-xl-6 mb-4">
        <TomMap location={getLocation()} />
      </div>
    </div>
  );
}

export default RentalMedia;
