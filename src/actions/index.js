import moves from '../apis/moves';
import users from '../apis/users';
import {
  OPEN_MODAL,
  CLOSE_MODAL,
  CREATE_MOVE,
  EDIT_MOVE,
  FETCH_MOVE,
  FETCH_MOVES,
  DELETE_MOVE,
  FETCH_USER,
  LOGOUT_USER
} from '../actions/types';
import { 
  SAVED_AUTH,
  TOKEN_HEADER,
  retrieveToken
} from '../utils/discordLogin';

export const openModal = modal => dispatch => {
  modal.isActive = true;
  dispatch({ type: OPEN_MODAL, payload: modal });
}

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_MODAL, payload: { isActive: false } });
}

export const createMove = move => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.post('', { params: { move } });
  dispatch({ type: CREATE_MOVE, payload: response.data });
};

export const editMove = move => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.put(`/${move.key}/guild/${move.guildId}`, { params: { move } });
  dispatch({ type: EDIT_MOVE, payload: response.data });
};

export const fetchMove = (key, guildId) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.get(`/${key}/guild/${guildId}`);
  dispatch({ type: FETCH_MOVE, payload: response.data });
};

export const fetchMoves = () => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.get();
  dispatch({ type: FETCH_MOVES, payload: response.data });
};

export const deleteMove = (key, guildId) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.delete(`/${key}/guild/${guildId}`);
  dispatch({ type: DELETE_MOVE, payload: key });
}

export const fetchUser = () => async dispatch => {
  const token = retrieveToken();
  users.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await users.get();
  dispatch({ type: FETCH_USER, payload: response.data })
}

export const logoutUser = () => async dispatch => {
  dispatch({ type: LOGOUT_USER, payload: {} })
}
