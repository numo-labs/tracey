import { query } from '../services/graphql';
import { UPDATE_SEARCH_RESULT } from '../constants/actions';
import { SEARCH } from '../constants/queries';
import resultMapper from '../services/resultMapper';
import copy from 'deepcopy';

/**
 * Pushed the search result onto the state.
 */
const update = (id, queries, result, raw) => ({
  type: UPDATE_SEARCH_RESULT,
  id,
  queries,
  tiles: result.tiles,
  hotels: result.hotels,
  raw: raw
});

/**
 * Searches for information based on the search id.
 */
export const search = (searchId, env) => {
  return (dispatch) => {
    console.log('searching for ', searchId);
    query(SEARCH, { searchId }, env).then(json => {
      const { id, queries, results } = json.data.tracing.search;
      const raw = copy(results);
      dispatch(update(id, queries, resultMapper(results), raw));
    });
  };
};
