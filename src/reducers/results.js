import { UPDATE_SEARCH_RESULT } from '../constants/actions';

const initialState = {
  id: '',
  queries: [],
  tiles: [],
  hotels: []
};

const results = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SEARCH_RESULT: {
      return {
        ...state,
        id: action.id,
        queries: action.queries,
        tiles: action.tiles,
        hotels: action.hotels
      };
    }
    default: return state;
  }
};

export default results;
