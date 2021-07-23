import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import FormError from './FormError';
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
          {...register('username', {
            required: 'Username is required',
            minLength: {
              value: 2,
              message: 'Username must be at least 2 characters',
            },
          })}
        />
        <ErrorMessage
          name="username"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
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

      <div className="form-group mb-3">
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          {...register('passwordConfirm', {
            required: 'Password confirmation is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters',
            },
            validate: {
              passwordsMatch: passwordsMatch('password', getValues),
            },
          })}
        />
        <ErrorMessage
          name="passwordConfirm"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>
      <button type="submit" className="btn btn-bi-form">
        Submit
      </button>
    </form>
  );
}

export default RegisterForm;
