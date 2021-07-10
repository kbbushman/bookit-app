const { Booking } = require('../models');

exports.getBookings = async (req, res) => {
  const { rental } = req.query;
  const query = rental ? Booking.find({ rental }) : Booking.find({});

  try {
    const bookings = await query.select('startDate endDate -_id').exec();
    return res.json(bookings);
  } catch (err) {
    return res.sendMongoError(err);
  }
};

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

    const { startDate, endDate } = await newBooking.save();

    res.status(201).json({ startDate, endDate });
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
