import { rentalData } from 'store/data';

export const FETCH_RENTALS = 'FETCH_RENTALS';
export const FETCH_ONE_RENTAL = 'FETCH_ONE_RENTAL';
export const CREATE_RENTAL = 'CREATE_RENTAL';

export function fetchRentals() {
  return {
    type: FETCH_RENTALS,
    rentals: rentalData,
  };
}

export function fetchOneRental(id) {
  const rental = rentalData.find((rental) => {
    return rental._id === id;
  });

  return {
    type: FETCH_ONE_RENTAL,
    rental,
  };
}

export function createRental(rental) {
  return {
    type: CREATE_RENTAL,
    rental,
  };
}
