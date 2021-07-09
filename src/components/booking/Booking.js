function Booking() {
  return (
    <div className="booking">
      <h3 className="booking-price">
        $12 <span className="booking-per-night">per night</span>
      </h3>
      <hr></hr>
      <div className="form-group mb-3">
        <label htmlFor="dates">Dates</label>
        <input
          placeholder="2020/12/12"
          type="text"
          className="form-control"
        ></input>
      </div>
      <div className="form-group mb-3">
        <label htmlFor="guests">Guests</label>
        <input
          value="1"
          min={1}
          type="number"
          className="form-control"
          id="guests"
          aria-describedby="guests"
        ></input>
      </div>
      <div className="d-grid">
        <button className="btn btn-bi-form btn-block">Reserve Now</button>
      </div>
      <hr></hr>
      <p className="booking-note-title">
        People are interested into this house
      </p>
      <p className="booking-note-text">
        More than 500 people checked this rental in last month.
      </p>
    </div>
  );
}

export default Booking;
