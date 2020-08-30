import moves from '../apis/moves';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CREATE_MOVE,
  EDIT_MOVE,
  FETCH_MOVE,
  FETCH_MOVES,
  DELETE_MOVE
} from '../actions/types';

export const openModal = modal => dispatch => {
  modal.isActive = true;
  dispatch({ type: OPEN_MODAL, payload: modal });
}

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_MODAL, payload: { isActive: false } });
}

export const createMove = move => async dispatch => {
  const response = await moves.post('', { params: { move: move } });
  dispatch({ type: CREATE_MOVE, payload: response.data });
};

export const editMove = move => async dispatch => {
  const response = await moves.put(`/${move.key}`, { move: move });
  dispatch({ type: EDIT_MOVE, payload: response.data });
};

export const fetchMove = key => async dispatch => {
  const response = await moves.get(`/${key}`);
  dispatch({ type: FETCH_MOVE, payload: response.data });
};

export const fetchMoves = () => async dispatch => {
  const response = await moves.get();
  dispatch({ type: FETCH_MOVES, payload: response.data });
};

export const deleteMove = key => async dispatch => {
  const response = await moves.delete(`/${key}`);
  dispatch({ type: DELETE_MOVE, payload: key });
}
