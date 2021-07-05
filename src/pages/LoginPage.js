import loginImage from 'images/login-image.jpg';

function LoginPage() {
  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Login</h1>
          {/* <!-- <div className="alert alert-success">
            Some message
          </div> --> */}
          <form>
            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" id="email" />
              {/* <div className="alert alert-danger">
                <div>
                  Email is required.
                </div>
                <div>
                  Must be valid email format!
                </div>
              </div> */}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" id="password" />
            </div>
            <button type="submit" className="btn btn-bi-main">
              Submit
            </button>
          </form>
          {/* <div className="alert alert-danger">
            <p>
              Some Error
            </p>
          </div> --> */}
        </div>
        <div className="col-md-6 ml-auto">
          <div className="image-container">
            <h2 className="catchphrase">
              Hundreds of awesome places in reach of few clicks.
            </h2>
            <img src={loginImage} alt="Login" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
