import { rentalData } from '../store/data';

export const FETCH_RENTALS = 'FETCH_RENTALS';

export function fetchRentals() {
  return {
    type: FETCH_RENTALS,
    rentals: rentalData,
  };
}
