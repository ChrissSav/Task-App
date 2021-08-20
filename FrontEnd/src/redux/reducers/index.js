import { combineReducers } from 'redux';
import errorTextReducer from './errorText';
import loggedReducer from './isLogged';
import reloadTaskReducer from './reloadTasks';

const allReducers = combineReducers({
  isLogged: loggedReducer,
  reloadTasks: reloadTaskReducer,
  errorText: errorTextReducer,
});

export default allReducers;
