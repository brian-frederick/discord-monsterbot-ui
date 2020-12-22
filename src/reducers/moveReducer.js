import _ from 'lodash';
import {
  CREATE_MOVE,
  EDIT_MOVE,
  FETCH_MOVE,
  FETCH_MOVES,
  DELETE_MOVE
} from '../actions/types';
import { compoundKey } from '../utils/moves';

export default (state={}, action) => {
  switch (action.type) {
    case CREATE_MOVE:
      return { ...state, [compoundKey(action.payload)]: action.payload };
    case EDIT_MOVE:
      return { ...state, [compoundKey(action.payload)]: action.payload };
    case FETCH_MOVE:
      return { ...state, [compoundKey(action.payload)]: action.payload };
    case FETCH_MOVES:
      return {...state, ..._.mapKeys(action.payload, (value, key) => {
        return compoundKey(value)
      })};
    case DELETE_MOVE:
      return _.omit(state, action.payload);
    default: return state;
  }
};
