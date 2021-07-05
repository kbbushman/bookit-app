const db = require('../models');
const rentalData = require('./data/rentals');

// ANSI color codes for console logs
const cyan = '\u001b[36m';
const yellow = '\x1b[33m%s\x1b[0m';
const green = '\x1b[32m';

(async function seedRentals() {
  // START
  console.log(cyan, '\n========================================');
  console.log(cyan, '\nBookIt Database Reset Utility\n');

  try {
    // COUNT RENTALS
    const count = await db.Rental.estimatedDocumentCount();
    console.log(yellow, `\nDeleting ${count} rentals...`);

    // DELETE RENTALS
    const { deletedCount } = await db.Rental.deleteMany();
    console.log(green, `Successfully deleted ${deletedCount} rentals.\n`);

    // ADD RENTALS
    console.log(yellow, `Adding ${rentalData.length} new rentals...`);
    const newRentals = await db.Rental.create(rentalData);
    console.log(green, `Successfully added ${newRentals.length} new rentals.`);
  } catch (err) {
    console.log('\u001b[31m', 'BookIt Databse Reset Error!');
    console.log(err);
    process.exit(1);
  }

  // EXIT
  console.log(cyan, '\nDone!');
  console.log('\u001b[36m', '\n========================================');
  process.exit(0);
})();
