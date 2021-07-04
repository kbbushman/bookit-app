function HomePage() {
  return (
    <div className="card-list">
      <div className="container">
        <h1 className="page-title">Your Home All Around the World</h1>
        <div className="row">
          <div className="col-md-3">
            <div className="card bi-card">
              <img
                className="card-img-top"
                src="http://via.placeholder.com/350x250"
                alt="Card Placeholder"
              />
              <div className="card-body">
                <h6 className="card-subtitle mb-0 text-muted">
                  Whole Apartment &#183; San Francisco
                </h6>
                <h5 className="card-title big-font">Awesome Place</h5>
                <p className="card-text">
                  $99 per Night &#183; Free Cancelation
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bi-card">
              <img
                className="card-img-top"
                src="http://via.placeholder.com/350x250"
                alt="Card Placeholder"
              />
              <div className="card-body">
                <h6 className="card-subtitle mb-0 text-muted">
                  Whole Apartment &#183; San Francisco
                </h6>
                <h5 className="card-title big-font">Awesome Place</h5>
                <p className="card-text">
                  $99 per Night &#183; Free Cancelation
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bi-card">
              <img
                className="card-img-top"
                src="http://via.placeholder.com/350x250"
                alt="Card Placeholder"
              />
              <div className="card-body">
                <h6 className="card-subtitle mb-0 text-muted">
                  Shared Apartment &#183; Walnut Creek
                </h6>
                <h5 className="card-title big-font">Sunny Place</h5>
                <p className="card-text">
                  $79 per Night &#183; Free Cancelation
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
