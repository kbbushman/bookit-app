const router = require('express').Router();
const { authRequired } = require('../middlewares');
const {
  getRentals,
  getRentalById,
  createRental,
  updateRental,
  deleteRental,
} = require('../controllers/rentals');

router.get('/', getRentals);
router.get('/:id', getRentalById);
router.post('/', authRequired, createRental);
router.put('/:id', updateRental);
router.delete('/:id', deleteRental);

module.exports = router;
