import { SAVE_PERMISSIONS, LOG_OUT, LOGIN_ERROR } from '../constants/actions';

/**
* Function that will save the permissions for a user
*/

export function savePermissions (idToken) {
  return { type: SAVE_PERMISSIONS, idToken };
}

export function logOut () {
  return (dispatch) => {
    localStorage.clear();
    return dispatch({type: LOG_OUT});
  };
}

export function setLoginError () {
  return { type: LOGIN_ERROR };
}
