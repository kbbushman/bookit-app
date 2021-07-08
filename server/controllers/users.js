const jwt = require('jsonwebtoken');
const config = require('../config');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.sendApiError({
      title: 'Login Error',
      message: 'Email and password are required',
    });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.sendApiError({
        title: 'Login Error',
        message: 'Email or password is incorrect',
      });
    }

    if (!user.hasSamePassword(password)) {
      return res.sendApiError({
        title: 'Login Error',
        message: 'Email or password is incorrect',
      });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      config.JWT_SECRET,
      {
        expiresIn: config.JWT_EXPIRES_IN,
      }
    );

    res.json({ token });
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.register = async (req, res) => {
  const { username, email, password, passwordConfirm } = req.body;

  if (!username || !email || !password) {
    return res.sendApiError({
      title: 'Registration Error',
      message: 'Username, email, and password are required',
    });
  }

  if (password !== passwordConfirm) {
    return res.sendApiError({
      title: 'Registration Error',
      message: 'Passwords do not match',
    });
  }

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });

    if (existingUser) {
      return res.sendApiError({
        title: 'Registration Error',
        message: 'Email address has already been registered',
      });
    }

    await User.create({ username, email, password });

    res.status(201).json({ message: 'Registration success' });
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.verify = (req, res) => {
  res.json({ message: 'Auth Verified.', userId: res.locals.user._id });
};
