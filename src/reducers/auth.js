import { UPDATE_SEARCH_RESULT, SAVE_PERMISSIONS } from '../constants/actions';

const initialState = {
  loginError: false,
  loggedIn: false,
  idToken: ''
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_PERMISSIONS: {
      return {
        ...state,
        idToken: action.idToken,
        loggedIn: true, 
      };
    }
    default: return state;
  }
};

export default auth;
