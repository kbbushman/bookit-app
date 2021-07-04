import { createStore, combineReducers } from 'redux';
import { rentals } from './reducers/rentals';
import { rental } from './reducers/rental';

export function initStore() {
  const reducer = combineReducers({
    rentals,
    rental,
  });

  const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(reducer, reduxDevTools);

  return store;
}
