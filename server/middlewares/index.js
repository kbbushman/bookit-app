const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

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

exports.authRequired = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return notAuthorized(res);

  const { decodedToken, tokenError } = parseToken(token);
  if (tokenError) return notAuthorized(res);

  try {
    const user = await User.findById(decodedToken.id);
    if (!user) return notAuthorized(res);
    res.locals.user = user;

    next();
  } catch (err) {
    res.sendMongoError(err);
  }
};

function parseToken(token) {
  try {
    const decodedToken = jwt.verify(token.split(' ')[1], config.JWT_SECRET);
    return { decodedToken };
  } catch (err) {
    return { tokenError: 'Token could not be parsed' };
  }
}

function notAuthorized(res) {
  return res.sendApiError({
    status: 401,
    title: 'Not Authorized',
    message:
      'You do not have permission to access this resource. Please login and try again',
  });
}
