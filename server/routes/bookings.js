const router = require('express').Router();
const { createBooking } = require('../controllers/bookings');
const { authRequired } = require('../middlewares');
const { blockRentalOwner } = require('../middlewares/rentals');

router.post('/', authRequired, blockRentalOwner, createBooking);

module.exports = router;
