import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import BiModal from '../shared/Modal';
import { createBooking, getBookings } from 'actions';

function Booking({ rental }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState('');
  const [nights, setNights] = useState(null);
  const [price, setPrice] = useState(null);
  const [disabledDates, setDisabledDates] = useState(null);
  const [datesSelected, setDateselected] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  useEffect(() => {
    let componentIsMounted = true;
    async function asyncGetBookings() {
      const bookings = componentIsMounted && (await getBookings(rental._id));
      componentIsMounted && disableBookedDates(bookings);
    }
    asyncGetBookings();

    return () => (componentIsMounted = false);
  }, [rental._id]);

  function getFormattedDates() {
    return {
      startDate: new Date(
        dateRange[0].startDate.setHours(15, 0, 0, 0)
      ).toISOString(),
      endDate: new Date(
        dateRange[0].endDate.setHours(12, 0, 0, 0)
      ).toISOString(),
    };
  }

  function disableBookedDates(bookedDates) {
    const dates = [];
    bookedDates.forEach(({ startDate, endDate }) => {
      const results = eachDayOfInterval({
        start: new Date(startDate),
        end: new Date(endDate),
      });
      dates.push(...results);
    });
    setDisabledDates(dates);
  }

  function displayDateRange() {
    return datesSelected
      ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
      : 'Please select dates';
  }

  function handleSetDateRange(dateRangeArray) {
    setDateRange(dateRangeArray);
    setDateselected(true);
  }

  function setModalDetails() {
    const nights = formatDistanceStrict(
      dateRange[0].startDate,
      dateRange[0].endDate,
      { unit: 'day' }
    )
      .replace('days', '')
      .replace(' ', '');
    setNights(parseInt(nights));
    setPrice(nights * rental.dailyPrice);
  }

  function openConfirmModal() {
    setModalDetails();
    setIsModalOpen(true);
  }

  async function handleCreateBooking() {
    const booking = {
      rental: rental._id,
      guests: parseInt(guests),
      nights,
      price,
      ...getFormattedDates(),
    };
    try {
      await createBooking(booking);
      alert('Sucess!');
      setIsModalOpen(false);
    } catch (err) {
      alert(JSON.stringify(err, null, 4));
    }
  }

  return (
    <div className="booking">
      <h3 className="booking-price">
        ${rental.dailyPrice}{' '}
        <span className="booking-per-night">per night</span>
      </h3>
      <hr></hr>
      <div className="form-group mb-3">
        <label htmlFor="dates" className="d-block">
          Dates
        </label>
        <input
          type="text"
          className="form-control text-muted mb-1 pointer"
          value={displayDateRange()}
          onClick={() => setShowDatePicker(!showDatePicker)}
          readOnly
        />
        {showDatePicker && (
          <>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => handleSetDateRange([item.selection])}
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              months={1}
              ranges={dateRange}
              minDate={new Date()}
              disabledDates={disabledDates}
              direction="vertical"
            />
            <div className="d-grid justify-content-md-end">
              <button
                className="btn btn-primary"
                onClick={() => setShowDatePicker(false)}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
      <div className="form-group mb-3">
        <label htmlFor="guests">Guests</label>
        <input
          className="form-control"
          type="number"
          id="guests"
          aria-describedby="guests"
          min={1}
          placeholder="Please enter guest count"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>
      <div className="d-grid">
        <button
          className="btn btn-lg btn-bi-form"
          onClick={openConfirmModal}
          disabled={!datesSelected || !guests}
        >
          Reserve Now
        </button>
      </div>
      <hr></hr>
      <p className="booking-note-title">
        People are interested into this house
      </p>
      <p className="booking-note-text">
        More than 500 people checked this rental in last month.
      </p>
      <BiModal
        open={isModalOpen}
        onCloseModal={() => setIsModalOpen(false)}
        onSubmit={handleCreateBooking}
        title="Confirm Reservation"
        subtitle={displayDateRange()}
      >
        <strong>{nights}</strong> Nights / <strong>${rental.dailyPrice}</strong>{' '}
        per Night
        <p>
          Guests: <strong>{guests}</strong>
        </p>
        <p>
          Price: <strong>${price}</strong>
        </p>
        <p>Do you confirm these reservation details?</p>
      </BiModal>
    </div>
  );
}

export default Booking;
