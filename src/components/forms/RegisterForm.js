import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from 'utils/helpers';
import { passwordsMatch } from 'utils/validators';

function RegisterForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          className="form-control"
          {...register('username', { required: true, minLength: 2 })}
        />
        {errors.username && (
          <div className="alert alert-danger mt-2">
            {errors.username.type === 'required' && 'Username is required'}
            {errors.username.type === 'minLength' &&
              'Username must be at least 2 characters'}
          </div>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          {...register('email', { required: true, pattern: EMAIL_PATTERN })}
        />
        {errors.email && (
          <div className="alert alert-danger mt-2">
            {errors.email.type === 'required' && 'Email is required'}
            {errors.email.type === 'pattern' &&
              'Email must be a valid email address'}
          </div>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          {...register('password', { required: true, minLength: 6 })}
        />
        {errors.password && (
          <div className="alert alert-danger mt-2">
            {errors.password.type === 'required' && 'Password is required'}
            {errors.password.type === 'minLength' &&
              'Password must be at least 6 characters'}
          </div>
        )}
      </div>

      <div className="form-group mb-3">
        <label htmlFor="passwordConfirmation">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register('passwordConfirmation', {
            required: true,
            minLength: 6,
            validate: { passwordsMatch: passwordsMatch('password', getValues) },
          })}
        />
        {errors.passwordConfirmation && (
          <div className="alert alert-danger mt-2">
            {errors.passwordConfirmation.type === 'required' &&
              'Password confirmation is required'}
            {errors.passwordConfirmation.type === 'minLength' &&
              'Password confirmation must be at least 6 characters'}
            {errors.passwordConfirmation.type === 'passwordsMatch' &&
              'Passwords do not match'}
          </div>
        )}
      </div>
      <button type="submit" className="btn btn-bi-main">
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
