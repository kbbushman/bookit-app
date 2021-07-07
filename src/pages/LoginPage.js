import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from 'components/forms/LoginForm';
import ApiErrors from 'components/forms/ApiErrors';
import loginImage from 'images/login-image.jpg';
import { withAuth } from 'providers/AuthProvider';

function LoginPage({ auth }) {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const token = await auth.logIn(formData);
      console.log(token);
      setShouldRedirect(true);
    } catch (err) {
      setErrors(err);
    }
  };

  if (shouldRedirect) return <Redirect to={{ pathname: '/' }} />;

  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Login</h1>
          <LoginForm onSubmit={handleSubmit} />
          {errors && <ApiErrors errors={errors} />}
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

export default withAuth(LoginPage);
