
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';

// Хранилище redux
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
var store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;