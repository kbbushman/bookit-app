const router = require('express').Router();
const {
  createBooking,
  getBookings,
  getUserBookings,
  getOwnerBookings,
} = require('../controllers/bookings');
const { authRequired } = require('../middlewares');
const { blockRentalOwner } = require('../middlewares/rentals');

router.get('', getBookings);
router.post('/', authRequired, blockRentalOwner, createBooking);
router.get('/me', authRequired, getUserBookings);
router.get('/owner', authRequired, getOwnerBookings);

module.exports = router;
