import { rentalData } from '../store/data';

export const FETCH_RENTALS = 'FETCH_RENTALS';
export const CREATE_RENTAL = 'CREATE_RENTAL';

export function fetchRentals() {
  return {
    type: FETCH_RENTALS,
    rentals: rentalData,
  };
}

export function createRental(rental) {
  return {
    type: CREATE_RENTAL,
    rental,
  };
}
