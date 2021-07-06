import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN } from 'utils/helpers';

function LoginForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          defaultValue=""
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
          defaultValue=""
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
      <button type="submit" className="btn btn-bi-main">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
