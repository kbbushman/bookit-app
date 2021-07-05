const db = require('../models');

const rentals = [
  {
    _id: Math.random().toString(32).slice(2),
    title: 'Nice view on ocean',
    city: 'san francisco',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 4,
    shared: true,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 43,
  },
  {
    _id: Math.random().toString(32).slice(2),
    title: 'Modern apartment in center',
    city: 'new york',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 1,
    shared: false,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 11,
  },
  {
    _id: Math.random().toString(32).slice(2),
    title: 'Old house in nature',
    city: 'bratislava',
    category: 'house',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 5,
    shared: true,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 23,
  },
];

exports.getRentals = (req, res) => {
  res.json(rentals);
};

exports.getRentalById = (req, res) => {
  const { id } = req.params;
  const rental = rentals.find((r) => r._id === id);
  res.json(rental);
};

exports.createRental = (req, res) => {
  const newRental = req.body;
  newRental._id = Math.random().toString(32).slice(2);
  rentals.push(newRental);
  res.status(201).json(newRental);
};

exports.updateRental = (req, res) => {
  const { id } = req.params;
  const rental = rentals.find((r) => r._id === id);
  rental.title = req.body.title;
  rental.city = req.body.city;
  rental.category = req.body.category;
  rental.image = 'http://via.placeholder.com/350x250';
  rental.numOfRooms = req.body.numOfRooms;
  rental.shared = req.body.shared;
  rental.description = req.body.description;
  rental.dailyPrice = req.body.dailyPrice || 99;
  res.json(rental);
};

exports.deleteRental = (req, res) => {
  const { id } = req.params;
  const index = rentals.indexOf((r) => r._id === id);
  rentals.splice(index, 1);
  res.sendStatus(200);
};
