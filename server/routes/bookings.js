const router = require('express').Router();
const { createBooking, getBookings } = require('../controllers/bookings');
const { authRequired } = require('../middlewares');
const { blockRentalOwner } = require('../middlewares/rentals');

router.get('', getBookings);
router.post('/', authRequired, blockRentalOwner, createBooking);

module.exports = router;
