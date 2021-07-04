import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RentalCard from '../components/rental/RentalCard';
import { fetchRentals, createRental } from '../actions';

function HomePage() {
  const dispatch = useDispatch();
  const rentals = useSelector((state) => state.rentals);

  useEffect(() => {
    dispatch(fetchRentals());
  }, []);

  const renderRentals = () => {
    return rentals.map((rental) => (
      <RentalCard key={rental._id} rental={rental} />
    ));
  };

  const handleAddRental = () => {
    const rental = {
      _id: Math.random().toString(32).slice(2),
      title: 'Downtown view',
      city: 'San Francisco',
      category: 'condo',
      image: 'http://via.placeholder.com/350x250',
      numOfRooms: 2,
      shared: false,
      description: 'Very nice apartment in center of the city.',
      dailyPrice: 79,
    };

    dispatch(createRental(rental));
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Your Home All Around the World</h1>
      <div className="row">{renderRentals()}</div>
      <button className="btn btn-success" onClick={handleAddRental}>
        Add Rental
      </button>
    </div>
  );
}

export default HomePage;
