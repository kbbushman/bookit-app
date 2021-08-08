const cloudinary = require('cloudinary').v2;
const config = require('../config');

cloudinary.config({
  cloud_name: config.CLOUDINARY_NAME,
  api_key: config.CLOUNDINARY_KEY,
  api_secret: config.CLOUNDINARY_SECRET,
  secure: true,
});

exports.cloudUpload = (file) => {
  return cloudinary.uploader.upload(file, {
    folder: 'bookit-rentals',
  });
};
