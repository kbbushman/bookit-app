import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import { toast } from 'react-toastify';
import formatDistanceStrict from 'date-fns/formatDistanceStrict';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
import BiModal from '../shared/Modal';
import ApiErrors from '../forms/ApiErrors';
import { createBooking, getBookings } from 'actions';

function Booking({ rental, isAuth }) {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState('');
  const [nights, setNights] = useState(null);
  const [price, setPrice] = useState(null);
  const [disabledDates, setDisabledDates] = useState(null);
  const [datesSelected, setDateselected] = useState(false);
  const [errors, setErrors] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const disableBookedDates = useCallback((bookedDates) => {
    const dates = [];
    bookedDates.forEach(({ startDate, endDate }) => {
      dates.push(...getDatesFromRange(startDate, endDate));
    });
    setDisabledDates(dates);
  }, []);

  useEffect(() => {
    let componentIsMounted = true;
    async function asyncGetBookings() {
      try {
        const bookings = componentIsMounted && (await getBookings(rental._id));
        componentIsMounted && disableBookedDates(bookings);
      } catch (err) {
        setErrors(err);
      }
    }
    asyncGetBookings();

    return () => (componentIsMounted = false);
  }, [rental._id, disableBookedDates]);

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

  function getDatesFromRange(startDate, endDate) {
    return eachDayOfInterval({
      start: new Date(startDate),
      end: new Date(endDate),
    });
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

  function resetDateRange() {
    setDateRange([
      {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
      },
    ]);
  }

  function setBookingDetails() {
    const nightCountString = formatDistanceStrict(
      dateRange[0].startDate,
      dateRange[0].endDate,
      { unit: 'day' }
    );
    const nights = parseInt(nightCountString);
    setNights(nights);
    setPrice(nights * rental.dailyPrice);
  }

  function resetBookingDetails() {
    resetDateRange();
    setGuests('');
    setNights(null);
    setPrice(null);
    setDateselected(false);
  }

  function openConfirmModal() {
    setBookingDetails();
    setErrors(null);
    setIsModalOpen(true);
  }

  async function handleCreateBooking() {
    const { startDate, endDate } = getFormattedDates();
    const booking = {
      rental: rental._id,
      guests: parseInt(guests),
      nights,
      price,
      startDate,
      endDate,
    };
    try {
      const { startDate, endDate } = await createBooking(booking);
      const newBookingDates = getDatesFromRange(startDate, endDate);
      setDisabledDates([...disabledDates, ...newBookingDates]);
      resetBookingDetails();
      setIsModalOpen(false);
      toast.success('Your reservation has been created!', {
        autoClose: 4000,
      });
    } catch (err) {
      setErrors(err);
      setDateselected(false);
      resetDateRange();
    }
  }

  return (
    <div className="booking">
      <h3 className="booking-price">
        ${rental.dailyPrice}{' '}
        <span className="booking-per-night">per night</span>
      </h3>
      <hr></hr>
      {!isAuth && (
        <div className="d-grid">
          <Link className="btn btn-lg btn-bi-form" to="/login">
            Log In to Reserve
          </Link>
        </div>
      )}
      {isAuth && (
        <>
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
          <BiModal
            open={isModalOpen}
            onCloseModal={() => setIsModalOpen(false)}
            onSubmit={handleCreateBooking}
            title="Confirm Reservation"
            subtitle={displayDateRange()}
          >
            <strong>{nights}</strong> Nights /{' '}
            <strong>${rental.dailyPrice}</strong> per Night
            <p>
              Guests: <strong>{guests}</strong>
            </p>
            <p>
              Price: <strong>${price}</strong>
            </p>
            {errors ? (
              <ApiErrors errors={errors} />
            ) : (
              <p>Do you confirm these reservation details?</p>
            )}
          </BiModal>
        </>
      )}
      <hr></hr>
      <p className="booking-note-title">
        People are interested into this house
      </p>
      <p className="booking-note-text">
        More than 500 people checked this rental in last month.
      </p>
    </div>
  );
}

export default Booking;
