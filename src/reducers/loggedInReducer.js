import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

export default (state=false, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return true;
    case LOGOUT_USER:
      return false;
    default: return state;
  }
}
