const router = require('express').Router();
const { authRequired } = require('../middlewares');

router.post('/', authRequired, (res, res) => {
    res.json({message: 'Uploading image...'})
});

module.exports = router;
