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
  LOGOUT_USER,
  EDIT_MOVE_GUILD
} from '../actions/types';

export const openModal = modal => dispatch => {
  modal.isActive = true;
  dispatch({ type: OPEN_MODAL, payload: modal });
}

export const closeModal = () => dispatch => {
  dispatch({ type: CLOSE_MODAL, payload: { isActive: false } });
}

export const createMove = (move, emailConsent) => async dispatch => {
  const response = await moves.post(`guilds/${move.guildId}/moves`, { params: { move, emailConsent } });
  dispatch({ type: CREATE_MOVE, payload: response.data });
};

export const editMove = (move, emailConsent) => async dispatch => {
  const response = await moves.patch(`guilds/${move.guildId}/moves/${move.key}`, { params: { move, emailConsent } });
  dispatch({ type: EDIT_MOVE, payload: response.data });
};

export const editMoveGuild = (key, currentGuildId, selectedGuild, emailConsent) => async dispatch => {
  const response = await moves.put(
    `guilds/${currentGuildId}/moves/${key}`,
    { params: { guildName: selectedGuild.name, guildId: selectedGuild.id, emailConsent } }
  );
  dispatch({ type: EDIT_MOVE_GUILD, payload: response.data });
}

export const fetchMove = (key, guildId) => async dispatch => {
  const response = await moves.get(`guilds/${guildId}/moves/${key}`);
  if (response.data?.key) {
    dispatch({ type: FETCH_MOVE, payload: response.data });
  }
};

export const fetchMoves = (guildId) => async dispatch => {
  const response = await moves.get(`guilds/${guildId}/moves/`);
  dispatch({ type: FETCH_MOVES, payload: response.data });
};

export const deleteMove = (key, guildId) => async dispatch => {
  await moves.delete(`guilds/${guildId}/moves/${key}`);
  dispatch({ type: DELETE_MOVE, payload: { key, guildId } });
}

export const fetchUser = () => async dispatch => {
  const response = await users.get();
  dispatch({ type: FETCH_USER, payload: response.data })
}

export const login = (code) => async dispatch => {
  users.defaults.headers.common['code'] = code;
  await users.post('login');
  // successful login, we'll just set user as empty.
  // The user data will be gotten in a subsequent call.
  dispatch({ type: FETCH_USER, payload: {}});
}

export const logout = () => async dispatch => {
  await users.post('logout');
  dispatch({ type: LOGOUT_USER, payload: {} })
}
