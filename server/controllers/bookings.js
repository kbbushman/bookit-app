const { Booking } = require('../models');

exports.createBooking = async (req, res) => {
  const bookingData = req.body;
  const newBooking = new Booking({ ...bookingData, user: res.locals.user._id });

  if (!validDates(newBooking)) {
    return res.sendApiError({
      title: 'Rental Error',
      message: 'Requested booking date range is not valid',
    });
  }

  try {
    const rentalBookings = await Booking.find({ rental: newBooking.rental });
    const bookingIsValid = validateBooking(newBooking, rentalBookings);

    if (!bookingIsValid) {
      return res.sendApiError({
        title: 'Rental Error',
        message: 'Requested booking date range is not available',
      });
    }

    const savedBooking = await newBooking.save();

    res.status(201).json({ booking: savedBooking });
  } catch (err) {
    res.sendMongoError(err);
  }
};

function validDates(newBooking) {
  let isValid = true;

  if (!newBooking.startDate || !newBooking.endDate) {
    isValid = false;
  }

  if (newBooking.startDate.valueOf() > newBooking.endDate.valueOf()) {
    isValid = false;
  }

  return isValid;
}

function validateBooking(newBooking, rentalBookings) {
  let isValid = true;
  if (rentalBookings && rentalBookings.length) {
    isValid = rentalBookings.every((booking) => {
      const newBookingStart = newBooking.startDate.valueOf();
      const newBookingEnd = newBooking.endDate.valueOf();

      const bookingStart = booking.startDate.valueOf();
      const bookingEnd = booking.endDate.valueOf();

      return (
        (bookingStart < newBookingStart && bookingEnd < newBookingStart) ||
        (newBookingEnd < bookingEnd && newBookingEnd < bookingEnd)
      );
    });
  }

  return isValid;
}
