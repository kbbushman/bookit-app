const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return User.sendError(res, {
      status: 422,
      title: 'Login Error',
      message: 'Email and password are required',
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return User.sendError(res, {
        status: 422,
        title: 'Login Error',
        message: 'Email or password is incorrect',
      });
    }

    if (!user.hasSamePassword(password)) {
      return User.sendError(res, {
        status: 422,
        title: 'Login Error',
        message: 'Email or password is incorrect',
      });
    }

    const token = jwt.sign({ id: user._id }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN,
    });

    res.json({ token });
  } catch (err) {
    User.sendError(res, {
      status: 500,
      title: 'Login Error',
      message: 'Something went wrong, please try again',
    });
  }
};

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
