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
import { 
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

export const createMove = (move, emailConsent) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.post(`guilds/${move.guildId}/moves`, { params: { move, emailConsent } });
  dispatch({ type: CREATE_MOVE, payload: response.data });
};

export const editMove = (move, emailConsent) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.patch(`guilds/${move.guildId}/moves/${move.key}`, { params: { move, emailConsent } });
  dispatch({ type: EDIT_MOVE, payload: response.data });
};

export const editMoveGuild = (key, currentGuildId, selectedGuild, emailConsent) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.put(
    `guilds/${currentGuildId}/moves/${key}`,
    { params: { guildName: selectedGuild.name, guildId: selectedGuild.id, emailConsent } }
  );
  dispatch({ type: EDIT_MOVE_GUILD, payload: response.data });
}

export const editMoveUser = (key, guildId, emailConsent) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const url = `guilds/${guildId}/moves/${key}/user`;
  const response = await moves.patch(url, { params: { emailConsent } });
  dispatch({ type: EDIT_MOVE, payload: response.data });
}

export const fetchMove = (key, guildId) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.get(`guilds/${guildId}/moves/${key}`);
  dispatch({ type: FETCH_MOVE, payload: response.data });
};

export const fetchMoves = (guildId) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  const response = await moves.get(`guilds/${guildId}/moves/`);
  dispatch({ type: FETCH_MOVES, payload: response.data });
};

export const deleteMove = (key, guildId) => async dispatch => {
  const token = retrieveToken();
  moves.defaults.headers.common[TOKEN_HEADER] = token ? token : undefined;
  await moves.delete(`guilds/${guildId}/moves/${key}`);
  dispatch({ type: DELETE_MOVE, payload: { key, guildId } });
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
