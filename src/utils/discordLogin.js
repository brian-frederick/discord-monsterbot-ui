import _ from 'lodash';
import { DISCORD_CLIENT_ID } from '../config.json';

export const URL_PARAMS = {
  STATE: 'state',
  TOKEN: 'access_token',
  EXPIRES_IN: 'expires_in',
  CODE: 'code'
};

export const SAVED_AUTH = {
  STATE: 'authState',
  TOKEN: 'authToken',
  EXPIRATION_DATE: 'authExpirationDate'
};

export const EMAIL_CONSENT = 'emailConsent';
export const TOKEN_HEADER = 'authorizationtoken'

// Just need a random string here to guard against clickjacking
const genRandomState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const checkForEmailConsent = () => {
  const emailConsent = localStorage.getItem(EMAIL_CONSENT) === 'true' ? true : false;
  console.log('emailConsent', emailConsent);
  return emailConsent;
}

export const saveEmailConsent = (consent) => {
    localStorage.setItem(EMAIL_CONSENT, consent);
};

export const deleteToken = () => {
  localStorage.removeItem(SAVED_AUTH.TOKEN);
  localStorage.removeItem(SAVED_AUTH.EXPIRATION_DATE);
  localStorage.removeItem(SAVED_AUTH.STATE);
}

export const clearUrlParams = () => {
  window.history.pushState({}, document.title, window.location.pathname);
}

export const isAuthStateValid = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const urlState = fragment.get(URL_PARAMS.STATE);
  const localState = localStorage.getItem(SAVED_AUTH.STATE);
  return urlState === localState;
}

export const isTokenInUrl = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const token = fragment.get(URL_PARAMS.TOKEN);
  const expiresIn = fragment.get(URL_PARAMS.EXPIRES_IN);

  return (token && expiresIn) ? true :  false;
}

export const parseFromUrl = (queryString, term) => {
  const query = new URLSearchParams(queryString);
  const value = query.get(term);
  console.log('value', value);
  return value;
}

export const login = () => {
  const baseUrl = window.origin;
  const discordState = genRandomState();
  localStorage.setItem(SAVED_AUTH.STATE, discordState);
  const login = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${baseUrl}/login&response_type=code&scope=identify%20email%20guilds&state=${discordState}`;
  window.location.href = login;
}

export const saveToken = () => {
  const fragment = new URLSearchParams(window.location.hash.slice(1));
  const token = fragment.get(URL_PARAMS.TOKEN);
  const expiresIn = parseInt(fragment.get(URL_PARAMS.EXPIRES_IN));
  
  const tokenExpirationDate = genExpirationDate(expiresIn);
  
  localStorage.setItem(SAVED_AUTH.TOKEN, token);
  localStorage.setItem(SAVED_AUTH.EXPIRATION_DATE, tokenExpirationDate);
}

export const retrieveToken = () => {
  return localStorage.getItem(SAVED_AUTH.TOKEN)
}

const genExpirationDate = expiresIn => {
  var day = new Date();
  day.setSeconds(day.getSeconds() + expiresIn);

  return day.getTime();
}

export const isValidTokenInStorage = () => {
  const token = localStorage.getItem(SAVED_AUTH.TOKEN);
  if (!token) return false;

  const expirationStamp = localStorage.getItem(SAVED_AUTH.EXPIRATION_DATE);
  if (!expirationStamp) return false;
  
  const expirationDate = new Date(parseInt(expirationStamp));
  const today = new Date();
  return today < expirationDate;
}

export const isMoveOwner = (move, user) => {
  if (_.isEmpty(user)) return false;
  return user.id === move.userId;
}






