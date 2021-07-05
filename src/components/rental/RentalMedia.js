function RentalMedia({ rental }) {
  return (
    <div className="row">
      <div className="col-md-6">
        <img src={rental.image} alt={rental.title} />
      </div>
      <div className="col-md-6">
        {/* <!-- TODO: Display Rental Map --> */}
        <img src={rental.image} alt={rental.title} />
      </div>
    </div>
  );
}

export default RentalMedia;
