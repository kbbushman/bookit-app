const mongoose = require('mongoose');

const cloudinaryImageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    cloudinaryId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CloudinaryImage', cloudinaryImageSchema);
