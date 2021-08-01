const router = require('express').Router();
const { authRequired } = require('../middlewares');
const upload = require('../services/multer');
const singleUpload = upload.single('image');


router.post('/', authRequired, (res, res) => {
    res.json({message: 'Uploading image...'})
});

module.exports = router;
