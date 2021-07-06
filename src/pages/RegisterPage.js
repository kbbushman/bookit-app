import registerImage from 'images/register-image.jpg';
import RegisterForm from '../components/forms/RegisterForm';

function RegisterPage() {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Register</h1>
          <RegisterForm onSubmit={handleSubmit} />
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
