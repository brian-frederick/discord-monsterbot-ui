import { combineReducers } from 'redux';
import modalReducer from './modalReducer';
import moveReducer from './moveReducer';

export default combineReducers({
  modal: modalReducer,
  moves: moveReducer
});
