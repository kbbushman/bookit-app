import LoginForm from 'components/forms/LoginForm';
import loginImage from 'images/login-image.jpg';

function LoginPage() {
  const handleSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <div className="bi-form">
      <div className="row">
        <div className="col-md-5">
          <h1 className="page-title">Login</h1>
          <LoginForm onSubmit={handleSubmit} />
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
