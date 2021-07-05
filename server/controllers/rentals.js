const db = require('../models');

exports.getRentals = (req, res) => {
  db.Rental.find({}, (err, rentals) => {
    if (err) {
      return res.status(422).json({
        errors: [
          {
            title: 'Rental Error!',
            message:
              'An error occurred while retrieving rentals. Please try again.',
          },
        ],
      });
    }

    res.json(rentals);
  });
};

exports.getRentalById = (req, res) => {
  const { id } = req.params;
  db.Rental.findById(id, (err, rental) => {
    if (err) {
      return res.status(422).json({
        errors: [
          {
            title: 'Rental Error!',
            message:
              'An error occurred while retrieving the requested rental. Please try again.',
          },
        ],
      });
    }

    res.json(rental);
  });
};

exports.createRental = (req, res) => {
  const rentalData = req.body;

  db.Rental.create(rentalData, (err, newRental) => {
    if (err) {
      return res.status(422).json({
        errors: [
          {
            title: 'Rental Error!',
            message:
              'An error occurred while creating the new rental. Please try again.',
          },
        ],
      });
    }

    res.status(201).json(newRental);
  });
};

exports.updateRental = (req, res) => {
  const { id } = req.params;

  // TODO: Finish update
  return res.status(422).json({
    errors: [
      {
        title: 'Server Error!',
        message: 'This rental update endpoint has not been completed.',
      },
    ],
  });
};

exports.deleteRental = (req, res) => {
  const { id } = req.params;

  // TODO: Finish delete
  return res.status(422).json({
    errors: [
      {
        title: 'Server Error!',
        message: 'This rental delete endpoint has not been completed.',
      },
    ],
  });
};
