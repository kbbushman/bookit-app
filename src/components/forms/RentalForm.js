import { ErrorMessage } from '@hookform/error-message';
import { useForm } from 'react-hook-form';
import FormError from './FormError';
import FileLoader from '../fileUpload/FileLoader';

function RentalForm({ handleCreateRental }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const rentalOptions = ['Apartment', 'Condo', 'House'];

  return (
    <form onSubmit={handleSubmit(handleCreateRental)}>
      <div className="form-group mb-3">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          className="form-control"
          id="title"
          {...register('title', {
            required: 'Title is required',
            maxLength: {
              value: 128,
              message: 'Title max length is 128 characters',
            },
          })}
        />
        <ErrorMessage
          name="title"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="city">City</label>
        <input
          type="text"
          className="form-control"
          id="city"
          {...register('city', {
            required: 'City is required',
          })}
        />
        <ErrorMessage
          name="city"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="street">Street</label>
        <input
          type="text"
          className="form-control"
          id="street"
          {...register('street', {
            required: 'Street is required',
            minLength: {
              value: 4,
              message: 'Street must be at least 4 characters',
            },
          })}
        />
        <ErrorMessage
          name="street"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="category">Category</label>

        <select
          className="form-control"
          id="category"
          {...register('category', {
            required: 'Category is required',
          })}
        >
          <option value="">-- Please select a category --</option>
          {rentalOptions.map((opt) => (
            <option value={opt.toLowerCase()} key={opt}>
              {opt}
            </option>
          ))}
        </select>
        <ErrorMessage
          name="category"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        {/* <label htmlFor="image">Image URL</label>
        <input
          type="text"
          className="form-control"
          id="image"
          {...register('image', {
            required: 'Image URL is required',
          })}
        /> */}
        <label htmlFor="image">Image</label>
        <FileLoader />
        <ErrorMessage
          name="image"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="numOfRooms">Number of Rooms</label>
        <input
          type="number"
          className="form-control"
          id="numOfRooms"
          min={1}
          max={200}
          step={1}
          {...register('numOfRooms', {
            required: 'Number of Rooms is required',
          })}
        />
        <ErrorMessage
          name="numOfRooms"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="description">Description</label>
        <textarea
          rows="5"
          type="text"
          className="form-control"
          id="description"
          {...register('description', {
            required: 'Description is required',
          })}
        ></textarea>
        <ErrorMessage
          name="description"
          errors={errors}
          as={<FormError />}
          render={({ message }) => <span>{message}</span>}
        />
      </div>

      <div className="form-group mb-3">
        <label htmlFor="dailyPrice">Daily Price</label>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text">$</div>
          </div>
          <input
            type="number"
            className="form-control"
            id="dailyPrice"
            min={1}
            max={100000}
            {...register('dailyPrice', {
              required: 'Daily Price is required',
            })}
          />
          <div className="w-100">
            <ErrorMessage
              name="dailyPrice"
              errors={errors}
              as={<FormError />}
              render={({ message }) => <span>{message}</span>}
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="shared" className="">
          Shared
        </label>
        <div>
          <input
            type="checkbox"
            className="form-check-input"
            id="shared"
            {...register('shared')}
          />
        </div>
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-lg btn-primary btn-bi-form">
          Create Rental
        </button>
      </div>
    </form>
  );
}

export default RentalForm;
