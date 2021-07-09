const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    startDate: {
      type: Date,
      required: 'Start date is required',
    },
    endDate: {
      type: Date,
      required: 'End date is required',
    },
    price: {
      type: Number,
      required: 'Price is required',
    },
    nights: {
      type: Number,
      required: 'Number of nights is required',
    },
    guests: {
      type: Number,
      required: 'Number of guests is required',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    rental: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rental',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Booking', bookingSchema);
