import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import moveReducer from './moveReducer';
import userReducer from './userReducer';
import loggedInReducer from './loggedInReducer';

export default combineReducers({
  loggedIn: loggedInReducer,
  modal: modalReducer,
  moves: moveReducer,
  user: userReducer
});
