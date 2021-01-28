import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import moveReducer from './moveReducer';
import userReducer from './userReducer';

export default combineReducers({
  modal: modalReducer,
  moves: moveReducer,
  user: userReducer
});
