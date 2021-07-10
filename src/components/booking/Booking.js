import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { DateRange } from 'react-date-range';
import BiModal from '../shared/Modal';

function Booking({ rental }) {
  const { id } = useParams();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [guests, setGuests] = useState('');
  const [datesSelected, setDateselected] = useState(null);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

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

  function displayDateRange() {
    return datesSelected
      ? `${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`
      : 'Please select dates';
  }

  function handleSetDateRange(dateRangeArray) {
    setDateRange(dateRangeArray);
    setDateselected(true);
  }

  function handleBooking() {
    console.log({
      rental: id,
      guests,
      ...getFormattedDates(),
    });
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
              direction="horizontal"
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
          onClick={() => setIsModalOpen(true)}
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
        onSubmit={handleBooking}
        title="Confirm Reservation"
        subtitle={displayDateRange()}
      >
        <strong>2</strong> Nights / <strong>${rental.dailyPrice}</strong> per
        Night
        <p>
          Guests: <strong>{guests}</strong>
        </p>
        <p>
          Price: <strong>$250</strong>
        </p>
        <p>Do you confirm these reservation details?</p>
      </BiModal>
    </div>
  );
}

export default Booking;
