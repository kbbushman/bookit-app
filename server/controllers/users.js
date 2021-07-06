const { User } = require('../models');

exports.login = async (req, res) => {};

exports.register = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password) {
    return User.sendError(res, {
      status: 422,
      title: 'Registration Error',
      message: 'Username, email, and password are required',
    });
  }

  if (password !== passwordConfirm) {
    return User.sendError(res, {
      status: 422,
      title: 'Registration Error',
      message: 'Passwords do not match',
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return User.sendError(res, {
        status: 422,
        title: 'Registration Error',
        message: 'Email address has already been registered',
      });
    }

    const newUser = await User.create({ username, email, password });

    res.status(201).json({ message: 'Registration success' });
  } catch (err) {
    User.sendError(res, {
      status: 500,
      title: 'Registration Error',
      message: 'Something went wrong, please try again',
    });
  }
};
