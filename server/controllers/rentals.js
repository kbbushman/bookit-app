const { Rental, Booking } = require('../models');

exports.getRentals = async (req, res) => {
  const { city } = req.query;

  const query = city ? { city: city.toLowerCase() } : {};

  try {
    const rentals = await Rental.find(query);
    res.json(rentals);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.getUserRentals = async (req, res) => {
  const { user } = res.locals;

  try {
    const rentals = await Rental.find({ owner: user });
    res.json(rentals);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id).populate(
      'owner',
      '-password -_id -updatedAt -__v'
    );
    if (!rental) {
      return res.sendApiError({
        title: 'Find Rental Error',
        message: `Rental with ID: ${req.params.id} does not exist`,
      });
    }

    res.json(rental);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.createRental = async (req, res) => {
  try {
    const rentalData = req.body;
    rentalData.owner = res.locals.user._id;
    const newRental = await Rental.create(rentalData);
    res.status(201).json(newRental);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.updateRental = async (req, res) => {
  // TODO: Finish update
  return res.sendApiError({
    title: 'Update Rental Error',
    status: 500,
    message: 'This rental update endpoint has not been completed.',
  });
};

exports.deleteRental = async (req, res) => {
  const { id } = req.params;
  const { user } = res.locals;

  try {
    const rental = await Rental.findById(id).populate('owner');

    if (!rental) {
      return res.sendApiError({
        title: 'Rental Delete Error',
        message: 'This requested rental does not exist',
      });
    }

    if (user.id !== rental.owner.id) {
      return res.sendApiError({
        title: 'Rental Delete Error',
        message: 'You do not have permission to delete this rental',
      });
    }

    const bookings = await Booking.find({ rental });

    if (bookings.length) {
      // TODOD: Check for active booking dates
      return res.sendApiError({
        title: 'Rental Delete Error',
        message: 'You cannot delete a rental with active bookings',
      });
    }

    await rental.remove();

    res.json({ id });
  } catch (err) {
    res.sendMongoError(err);
  }
};
