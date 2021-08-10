const { Rental, User, Booking, CloudinaryImage } = require('../models');
const { userData, rentalData, imageData } = require('./data');

// ANSI color codes
const cyan = '\u001b[36m';
const yellow = '\x1b[33m%s\x1b[0m';
const green = '\x1b[32m';
const red = '\u001b[31m';

async function deleteDocuments(collectionName, Model) {
  const count = await Model.estimatedDocumentCount();
  console.log(yellow, `Deleting ${count} ${collectionName}...`);
  const { deletedCount } = await Model.deleteMany();
  console.log(green, `Success! ${deletedCount} ${collectionName} deleted\n`);
}

async function addDocuments(collectionName, Model, data) {
  console.log(yellow, `Adding ${data.length} new ${collectionName}...`);
  const result = await Model.create(data);
  console.log(green, `Success! ${result.length} new ${collectionName} added\n`);
}

(async function seedDatabase() {
  console.log(cyan, '\n========================================');
  console.log(cyan, '\nBookIt Database Reset Utility\n');

  try {
    await deleteDocuments('users', User);
    await deleteDocuments('rentals', Rental);
    await deleteDocuments('bookings', Booking);
    await deleteDocuments('images', CloudinaryImage);

    await addDocuments('users', User, userData);
    await addDocuments('rentals', Rental, rentalData);
    await addDocuments('images', CloudinaryImage, imageData);
  } catch (err) {
    console.log(red, 'BookIt Databse Reset Error!');
    console.log(err);
    process.exit(1);
  }

  console.log(cyan, 'Done!');
  console.log(cyan, '\n========================================');
  process.exit(0);
})();
