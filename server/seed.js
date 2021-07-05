const db = require('./models');
const rentalData = require('./models/tempData/rentals');

// ANSI Color Codes
console.log('\u001b[36m', '\n============================================');

console.log('\u001b[36m', '\nBookIt Database Reset Utility\n');

db.Rental.estimatedDocumentCount({}, (err, count) => {
  // DELETE RENTALS
  db.Rental.deleteMany({}, (err, result) => {
    console.log('\x1b[33m%s\x1b[0m', `\nDeleting ${count} rentals...`);

    if (err) {
      console.log('\u001b[31m', 'Error deleting rentals!');
      console.log(err);
      process.exit(1);
    }

    console.log(
      '\x1b[32m',
      `Successfully deleted ${result.deletedCount} rentals.\n`
    );
    console.log(
      '\x1b[33m%s\x1b[0m',
      `Adding ${rentalData.length} new rentals...`
    );

    // CREATE RENTALS
    db.Rental.create(rentalData, (err, newRentals) => {
      if (err) {
        console.log('\u001b[31m', 'Error adding new rentals!');
        console.log(err);
        process.exit(1);
      }

      console.log(
        '\x1b[32m',
        `Successfully added ${newRentals.length} new rentals.`
      );

      console.log('\u001b[36m', '\nDone!');

      console.log(
        '\u001b[36m',
        '\n============================================'
      );
      process.exit(0);
    });
  });
});
