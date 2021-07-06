import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import FormError from './FormError';
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
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: EMAIL_PATTERN,
              message: 'Email must be a valid email address',
            },
          })}
        />
        <ErrorMessage
          name="email"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>
      <div className="form-group mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          defaultValue=""
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
          })}
        />
        <ErrorMessage
          name="password"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>
      <button type="submit" className="btn btn-bi-main">
        Submit
      </button>
    </form>
  );
}

export default LoginForm;
