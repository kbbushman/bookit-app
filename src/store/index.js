import { createStore, combineReducers } from 'redux';
import { rentals } from './reducers/rentals';

export function initStore() {
  const reducer = combineReducers({
    rentals,
  });

  const reduxDevTools =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(reducer, reduxDevTools);

  return store;
}
