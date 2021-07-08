const mongoose = require('mongoose');

const userData = [
  {
    _id: mongoose.Types.ObjectId(),
    username: 'UserOne',
    email: 'test1@test.com',
    password: '123456',
  },
  {
    _id: mongoose.Types.ObjectId(),
    username: 'UserTwo',
    email: 'test2@test.com',
    password: '123456',
  },
  {
    _id: mongoose.Types.ObjectId(),
    username: 'UserThree',
    email: 'test3@test.com',
    password: '123456',
  },
];

const rentalData = [
  {
    title: 'Nice ocean view',
    city: 'San Francisco',
    street: '2nd St',
    category: 'condo',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 4,
    shared: true,
    description: 'Spacious condo with a beautiful ocean view.',
    dailyPrice: 99,
    owner: userData[0]._id,
  },
  {
    title: 'Modern spacious apartment',
    city: 'New York',
    street: '17 W 32nd St',
    category: 'apartment',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 1,
    shared: false,
    description: 'Modern spacious apartment in the center of the city.',
    dailyPrice: 130,
    owner: userData[0]._id,
  },
  {
    title: 'Luxurious house in London',
    city: 'London',
    street: 'Bull Inn Court,',
    category: 'house',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 5,
    shared: false,
    description: 'Spacious and luxurious house in a very popular neighborhood.',
    dailyPrice: 150,
    owner: userData[1]._id,
  },
];

module.exports = {
  userData,
  rentalData,
};
