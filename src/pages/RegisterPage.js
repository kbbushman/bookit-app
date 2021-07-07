import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import RegisterForm from 'components/forms/RegisterForm';
import registerImage from 'images/register-image.jpg';
import { registerUser } from 'actions';
import ApiErrors from '../components/forms/ApiErrors';

function RegisterPage() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      await registerUser(formData);
      setShouldRedirect(true);
    } catch (err) {
      setErrors(err);
    }
  };

  if (shouldRedirect)
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { message: 'Registration Success! Please log in to continue' },
        }}
      />
    );

  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Register</h1>
          <RegisterForm onSubmit={handleSubmit} />
          {errors && <ApiErrors errors={errors} />}
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
