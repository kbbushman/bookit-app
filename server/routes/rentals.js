const router = require('express').Router();
const { authRequired } = require('../middlewares');
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
  getUserRentals,
} = require('../controllers/rentals');

router.get('/', getRentals);
router.get('/me', authRequired, getUserRentals);
router.get('/:id', getRentalById);
router.post('/', authRequired, createRental);
router.put('/:id', authRequired, updateRental);
router.delete('/:id', authRequired, deleteRental);

module.exports = router;
