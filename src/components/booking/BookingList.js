function BookingList() {
  return (
    <section className="booking-listing">
      <h1 className="page-title">Page Title</h1>
      <div className="row">
        {/* Iterate Bookings */}
        <div className="col-md-4">
          <div className="card text-center">
            {/* Only if 'received' booking */}
            <div className="card-header">From: Some User</div>
            {/* Only if 'received' booking END */}
            <div className="card-block">
              <h4 className="card-title">Rental Title - Rental City </h4>
              <p className="card-text booking-days">
                2020/02/02 - 2020/02/07 | 5 nights
              </p>
              <p className="card-text">
                <span>Price: </span>{' '}
                <span className="booking-price-value">$250</span>
              </p>
              <a className="btn bwm-btn-main">Go to Rental</a>
              <button className="ml-1 btn btn-danger">Delete</button>
            </div>
            <div className="card-footer text-muted">Created at 2020/02/01</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookingList;
