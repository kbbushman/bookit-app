const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  const bookingData = req.body;
  const newBooking = new Booking({ ...bookingData, user: res.locals.user._id });

  try {
    const rentalBookings = Booking.find({ rental: newBooking.rental });

    const bookingIsValid = validateBooking(newBooking, rentalBookings);
    if (!bookingIsValid) {
      return res.sendApiError({
        title: 'Rental Error',
        message: 'Requested rental booking is not valid',
      });
    }

    const savedBooking = await newBooking.save();

    res.status(201).json({ booking: savedBooking });
  } catch (err) {
    res.sendMongoError(err);
  }
};

function validateBooking(newBooking, rentalBookings) {
  // TODO: Implement booking validation
  return true;
}
