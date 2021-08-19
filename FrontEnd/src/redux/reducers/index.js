import { combineReducers } from 'redux';
import errorTextReducer from './errorText';
import loggedReducer from './isLogged';

const allReducers = combineReducers({
  isLogged: loggedReducer,
  errorText: errorTextReducer,
});

export default allReducers;
