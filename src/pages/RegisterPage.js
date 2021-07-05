import registerImage from 'images/register-image.jpg';

function RegisterPage() {
  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Register</h1>
          <form>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input type="text" className="form-control" id="username" />
              {/* <div className="alert alert-danger">
                <div *ngIf="username.errors.required">
                  Username is required.
                </div>
              </div> */}
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="passwordConfirmation">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirmation"
              />
            </div>
            <button type="submit" className="btn btn-bi-main">
              Submit
            </button>
          </form>
          {/* <div className="alert alert-danger">
            <p>
              Some Error
            </p>
          </div> */}
        </div>
        <div className="col-md-6 ml-auto">
          <div className="image-container">
            <h2 className="catchphrase">
              As our member you have access to most awesome places in the world.
            </h2>
            <img src={registerImage} alt="Register" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
