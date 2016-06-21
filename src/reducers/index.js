import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import results from './results';
import auth from './auth';
const rootReducer = combineReducers({
  results,
  auth,
  routing: routerReducer
});

export default rootReducer;
