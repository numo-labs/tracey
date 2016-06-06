import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import results from './results';

const rootReducer = combineReducers({
  results,
  routing: routerReducer
});

export default rootReducer;
