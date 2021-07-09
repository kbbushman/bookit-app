const mongoose = require('mongoose');
const config = require('../config');

const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(config.MONGODB_URI, options)
  .then(() => console.log('MongoDB connected successfully...\n'))
  .catch((err) => console.log(err));

module.exports = {
  Rental: require('./Rental'),
  User: require('./User'),
  Booking: require('./Booking'),
};
