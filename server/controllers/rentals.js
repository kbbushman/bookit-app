const { Rental } = require('../models');

exports.getRentals = async (req, res) => {
  try {
    const rentals = await Rental.find({});
    res.json(rentals);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.getRentalById = async (req, res) => {
  try {
    const rental = await Rental.findById(req.params.id);
    if (!rental) throw new Error();
    res.json(rental);
  } catch (err) {
    res.sendMongoError(err);
  }
};

exports.createRental = async (req, res) => {
  try {
    const newRental = await Rental.create(req.body);
    res.status(201).json(newRental);
  } catch (err) {
    res.sendMongoError(err);
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
