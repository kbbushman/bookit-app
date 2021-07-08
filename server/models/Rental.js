const mongoose = require('mongoose');

const rentalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: 'Title is required',
      maxlength: [128, 'Invalid title. Maximum length is 128 characters'],
    },
    city: {
      type: String,
      required: 'City is required',
      lowercase: true,
    },
    street: {
      type: String,
      required: 'Street is required',
      lowercase: true,
      minlength: [4, 'Invalid street. Minimum length is 4 characters'],
    },
    category: {
      type: String,
      required: 'Category is required',
      lowercase: true,
    },
    image: {
      type: String,
      required: 'Image is required',
    },
    description: {
      type: String,
      required: 'Description is required',
    },
    dailyPrice: {
      type: Number,
      required: 'Daily price is required',
    },
    numOfRooms: {
      type: Number,
      required: 'Number of rooms is required',
    },
    shared: {
      type: Boolean,
      required: 'Shared is required',
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

rentalSchema.statics.sendError = function (res, config) {
  const { status, message } = config;

  return res.status(status).json({
    errors: [{ title: 'Rental Error!', message }],
  });
};

module.exports = mongoose.model('Rental', rentalSchema);
