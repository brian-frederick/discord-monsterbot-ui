import _ from 'lodash';
import { DISCORD_CLIENT_ID } from '../config.json';

export const URL_PARAMS = {
  STATE: 'state',
  CODE: 'code'
};

export const SAVED_AUTH = {
  STATE: 'authState',
};

export const EMAIL_CONSENT = 'emailConsent';

export const loginModalContent = {
  header: 'monsterbot needs cookies.',
  content: 'Just a heads up that this site will use cookies to get your discord info. If you have trouble logging in, check for any third-party cookie blockers.',
  submitAction: () => loginWithDiscord(),
};

// Just need a random string here to guard against clickjacking
const genRandomState = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const checkForEmailConsent = () => {
  const emailConsent = localStorage.getItem(EMAIL_CONSENT) === 'true' ? true : false;
  return emailConsent;
}

export const saveEmailConsent = (consent) => {
    localStorage.setItem(EMAIL_CONSENT, consent);
};

export const clearUrlParams = () => {
  window.history.pushState({}, document.title, window.location.pathname);
}

export const isAuthStateValid = () => {
  const fragment = new URLSearchParams(window.location.search);
  const urlState = fragment.get(URL_PARAMS.STATE);
  const localState = localStorage.getItem(SAVED_AUTH.STATE);
  const valid = urlState === localState;
  if (!valid) {
    alert('Invalid Auth State. This is most likely because of some funny business like clickjacking. Please contact administrator at brianfrederick@hey.com');
  } 
  return valid;
}

export const parseFromUrl = (term) => {
  const query = new URLSearchParams(window.location.search);
  const value = query.get(term);
  return value;
}

export const loginWithDiscord = () => {
  const baseUrl = window.origin;
  const discordState = genRandomState();
  localStorage.setItem(SAVED_AUTH.STATE, discordState);
  const login = `https://discord.com/api/oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${baseUrl}&response_type=code&scope=identify%20email%20guilds&state=${discordState}`;
  window.location.href = login;
}

export const isMoveOwner = (move, user) => {
  if (_.isEmpty(user)) return false;
  return user.id === move.userId;
}






