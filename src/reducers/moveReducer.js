import _ from 'lodash';
import {
  FETCH_MOVES
} from '../actions/types';

export default (state={}, action) => {
  switch (action.type) {
    case FETCH_MOVES:
      return {...state, ..._.mapKeys(action.payload, 'key')};
    default:
      return state;
  }
};
