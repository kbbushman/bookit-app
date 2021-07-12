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
  {
    _id: mongoose.Types.ObjectId(),
    username: 'UserFour',
    email: 'test4@test.com',
    password: '123456',
  },
  {
    _id: mongoose.Types.ObjectId(),
    username: 'UserFive',
    email: 'test5@test.com',
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
  {
    title: 'Test Rental One',
    city: 'san francisco',
    street: '100 market st',
    category: 'apartment',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 2,
    description: 'This is just a test.',
    dailyPrice: 130,
    shared: true,
    owner: userData[0]._id,
  },
  {
    title: 'Test Rental Two',
    city: 'san francisco',
    street: '400 howard st',
    category: 'condo',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 4,
    description: 'This is just a test.',
    dailyPrice: 99,
    shared: true,
    owner: userData[0]._id,
  },
  {
    title: 'Test Rental Three',
    city: 'san francisco',
    street: '800 market st',
    category: 'apartment',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 3,
    description: 'This is just a test.',
    dailyPrice: 115,
    shared: false,
    owner: userData[0]._id,
  },
  {
    title: 'Test Rental Four',
    city: 'san francisco',
    street: '55 montgomery st',
    category: 'house',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 2,
    description: 'This is just a test.',
    dailyPrice: 145,
    shared: false,
    owner: userData[0]._id,
  },
  {
    title: 'Test Rental Five',
    city: 'san francisco',
    street: '22 Kearny st',
    category: 'house',
    image:
      'https://booksync-jerga-prod.s3.amazonaws.com/uploads/rental/image/5/image.jpeg',
    numOfRooms: 2,
    description: 'This is just a test.',
    dailyPrice: 95,
    shared: true,
    owner: userData[0]._id,
  },
];

module.exports = {
  userData,
  rentalData,
};
