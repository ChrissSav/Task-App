import { combineReducers } from 'redux';
import addTaskReducer from './addTaskReducer';
import errorTextReducer from './errorText';
import loggedReducer from './isLogged';

const allReducers = combineReducers({
  isLogged: loggedReducer,
  errorText: errorTextReducer,
  addTask: addTaskReducer,
});

export default allReducers;
