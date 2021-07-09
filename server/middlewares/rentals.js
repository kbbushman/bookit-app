const { Rental } = require('../models');

exports.blockRentalOwner = async (req, res, next) => {
  const user = res.locals.user;
  const { rental } = req.body;

  try {
    const requestedRental = await Rental.findById(rental);
    if (requestedRental.owner.equals(user._id)) {
      return res.sendApiError({
        title: 'Rental Error',
        message: 'You cannot book your own rental',
      });
    }

    next();
  } catch (err) {
    res.sendMongoError(err);
  }
};
