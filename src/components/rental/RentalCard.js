function RentalCard({ rental }) {
  return (
    <div className="col-md-3">
      <div className="card bi-card">
        <img className="card-img-top" src={rental.image} alt={rental.title} />
        <div className="card-body">
          <h6 className="card-subtitle mb-0 text-muted">
            {rental.shared && 'Shared'} {rental.category} &#183; {rental.city}
          </h6>
          <h5 className="card-title big-font">{rental.title}</h5>
          <p className="card-text">
            ${rental.dailyPrice} per Night &#183; Free Cancelation
          </p>
        </div>
      </div>
    </div>
  );
}

export default RentalCard;
