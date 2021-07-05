const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxlength: [128, 'Invalid title. Maximum length is 128 characters'],
    },
    city: {
      type: String,
      required: true,
      lowercase: true,
    },
    street: {
      type: String,
      required: true,
      lowercase: true,
      minlength: [4, 'Invalid street. Minimum length is 4 characters'],
    },
    category: {
      type: String,
      required: true,
      lowercase: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    dailyPrice: {
      type: Number,
      required: true,
    },
    numOfRooms: {
      type: Number,
      required: true,
    },
    shared: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

rentalSchema.methods.sendError = function (res, config) {
  const { status, message } = config;

  return res.status(status).json({
    errors: [{ title: 'Rental Error!', message }],
  });
};

module.exports = mongoose.model('Rental', rentalSchema);
