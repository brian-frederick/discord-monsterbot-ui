import moves from '../apis/moves';
import { FETCH_MOVES } from './types';

export const fetchMoves = () => async dispatch => {
  const response = await moves.get();
  dispatch({ type: FETCH_MOVES, payload: response.data });
};
