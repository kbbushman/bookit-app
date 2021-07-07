function ApiErrors({ errors }) {
  return (
    <div className="alert alert-danger">
      {errors.map((error) => (
        <span key={error.title}>{error.message}</span>
      ))}
    </div>
  );
}

export default ApiErrors;
