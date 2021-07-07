import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rentals } from './reducers/rentals';
import { rental } from './reducers/rental';
import { auth } from './reducers/auth';

export function initStore() {
  const reducer = combineReducers({
    rentals,
    rental,
    auth,
  });

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const middleware = composeEnhancers(applyMiddleware(thunk));

  const store = createStore(reducer, middleware);

  return store;
}
