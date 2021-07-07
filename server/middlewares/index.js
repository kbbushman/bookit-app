exports.provideErrorHandlers = (req, res, next) => {
  res.sendApiError = function (config) {
    const { status = 422, title, message } = config;

    return res.status(status).json({
      errors: [{ title, message }],
    });
  };

  res.sendMongoError = (dbError) => {
    const normalizedErrors = [];
    const errorField = 'errors';

    if (
      dbError &&
      dbError.hasOwnProperty(errorField) &&
      dbError.name === 'ValidationError'
    ) {
      const errors = dbError[errorField];

      for (let property in errors) {
        normalizedErrors.push({
          title: property,
          message: errors[property].message,
        });
      }
    } else {
      normalizedErrors.push({
        title: 'DB Error',
        message: 'Something went wrong, please try again',
      });
    }

    return res.status(422).json({ errors: normalizedErrors });
  };

  next();
};
