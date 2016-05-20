import {LIVE_PUSH} from '../constants/actions';

const initialState = {
  stream: {}
};

export default function live (state = initialState, action) {
  switch (action.type) {
    case LIVE_PUSH: {
      if (state.stream[action.id]) {
        return {
          ...state,
          stream: {
            ...state.stream,
            [action.id]: state.stream[action.id].concat(action.items)
          }
        };
      } else {
        return {
          ...state,
          stream: {
            [action.id]: [action.items]
          }
        };
      }
    }
    default: return state;
  }
}
