import { query } from '../services/graphql';
import { UPDATE_SEARCH_RESULT } from '../constants/actions';
import { SEARCH } from '../constants/queries';
import resultMapper from '../services/resultMapper';

/**
 * Pushed the search result onto the state.
 */
const update = (id, queries, result) => ({
  type: UPDATE_SEARCH_RESULT,
  id,
  queries,
  tiles: result.tiles,
  hotels: result.hotels
});

/**
 * Searches for information based on the search id.
 */
export const search = (searchId, env) => {
  return (dispatch) => {
    console.log('searching for ', searchId);
    query(SEARCH, { searchId }, env).then(json => {
      const { id, queries, results } = json.data.tracing.search;
      dispatch(update(id, queries, resultMapper(results)));
    });
  };
};
