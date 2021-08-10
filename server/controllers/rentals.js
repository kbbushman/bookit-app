const { Rental, Booking } = require('../models');

exports.getRentals = async (req, res) => {
  const { city } = req.query;

  const query = city ? { city: city.toLowerCase() } : {};

  try {
    const rentals = await Rental.find(query).populate('image');
    res.json(rentals);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.getUserRentals = async (req, res) => {
  const { user } = res.locals;

  try {
    const rentals = await Rental.find({ owner: user }).populate('image');
    res.json(rentals);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id)
      .populate('owner', '-password -_id -updatedAt -__v')
      .populate('image');
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

exports.verifyUser = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);

    if (!rental) {
      return res.sendApiError({
        title: 'Update Rental Error',
        message: 'This requested rental does not exist',
      });
    }

    if (rental.owner.toString() !== res.locals.user.id) {
      return res.sendApiError({
        title: 'Rental Owner Verification',
        message: 'You are not the rental owner',
      });
    }

    res.json({ status: 'Verified' });
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
  const { id } = req.params;
  const rentalData = req.body;

  try {
    const rental = await Rental.findById(id).populate(
      'owner',
      '-password -__v'
    );

    if (!rental) {
      return res.sendApiError({
        title: 'Update Rental Error',
        message: 'This requested rental does not exist',
      });
    }

    if (rental.owner.id !== res.locals.user.id) {
      return res.sendApiError({
        title: 'Update Rental Error',
        message: 'You do not have permission to update this rental',
      });
    }

    rental.set(rentalData);
    await rental.save();

    res.json(rental);
  } catch (err) {
    res.sendMongoError(err);
  }
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
