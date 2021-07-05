const { Rental } = require('../models');

exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({});
    res.json(rentals);
  } catch (err) {
    Rental.sendError(res, {
      status: 422,
      message: 'An error occurred while retrieving rentals.',
    });
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    res.json(rental);
  } catch (err) {
    Rental.sendError(res, {
      status: 422,
      message: 'An error occurred while retrieving the requested rental.',
    });
  }
};

exports.createRental = async (req, res) => {
  try {
    const newRental = await Rental.create(req.body);
    res.status(201).json(newRental);
  } catch (err) {
    Rental.sendError(res, {
      status: 422,
      message: 'An error occurred while creating the new rental.',
    });
  }
};

exports.updateRental = async (req, res) => {
  // TODO: Finish update
  return Rental.sendError(res, {
    status: 500,
    message: 'This rental update endpoint has not been completed.',
  });
};

exports.deleteRental = async (req, res) => {
  // TODO: Finish delete
  return Rental.sendError(res, {
    status: 500,
    message: 'This rental delete endpoint has not been completed.',
  });
};
