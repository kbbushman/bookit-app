import TomMap from '../map/TomMap';

function RentalMedia({ rental }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={rental.image} alt={rental.title} />
      </div>
      <div className="col-md-6">
        <TomMap />
      </div>
    </div>
  );
}

export default RentalMedia;
