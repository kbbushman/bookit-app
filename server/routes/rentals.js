const router = require('express').Router();
const { authRequired } = require('../middlewares');
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getUserRentals,
  verifyUser,
} = require('../controllers/rentals');

router.get('/', getRentals);
router.get('/me', authRequired, getUserRentals);
router.get('/:id', getRentalById);
router.get('/:id/verify-user', authRequired, verifyUser);
router.post('/', authRequired, createRental);
router.put('/:id', authRequired, updateRental);
router.delete('/:id', authRequired, deleteRental);

module.exports = router;
