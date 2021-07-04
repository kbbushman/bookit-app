import { useState } from 'react';
import RentalCard from '../components/rental/RentalCard';

const initialState = [
  {
    _id: '1',
    title: 'Nice view on ocean',
    city: 'San Francisco',
    category: 'condo',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 4,
    shared: true,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 43,
  },
  {
    _id: '2',
    title: 'Modern apartment in center',
    city: 'New York',
    category: 'apartment',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 1,
    shared: false,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 11,
  },
  {
    _id: '3',
    title: 'Old house in nature',
    city: 'Bratislava',
    category: 'house',
    image: 'http://via.placeholder.com/350x250',
    numOfRooms: 5,
    shared: true,
    description: 'Very nice apartment in center of the city.',
    dailyPrice: 23,
  },
];

function HomePage() {
  const [rentals] = useState(initialState);

  const renderRentals = () => {
    return rentals.map((rental) => (
      <RentalCard key={rental._id} rental={rental} />
    ));
  };

  return (
    <div className="card-list">
      <h1 className="page-title">Your Home All Around the World</h1>
      <div className="row">{renderRentals()}</div>
    </div>
  );
}

export default HomePage;
