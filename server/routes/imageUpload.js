const router = require('express').Router();
const { authRequired } = require('../middlewares');
const upload = require('../services/multer');
const { dataUri } = require('../services/dataUri');
const { cloudUpload } = require('../services/cloudinary');

const singleUpload = upload.single('image');

const singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (err) => {
    if (err) {
      return res.sendApiError({
        title: 'Upload Error',
        message: err.message,
      });
    }

    next();
  });
};

router.post('/', authRequired, singleUploadCtrl, async (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No image was found in upload');
    }

    console.log(req.file);
    const base64Image = dataUri(req.file);
    const result = await cloudUpload(
      base64Image.content,
      req.file.originalname
    );
    console.log(result);
    res.json({ message: 'Uploading image...' });
  } catch (err) {
    return res.sendApiError({
      title: 'Upload Error',
      message: 'Oops! Something went wrong. Please try again',
    });
  }
});

module.exports = router;
