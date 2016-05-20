import {LIVE_PUSH} from '../constants/actions';

export function stream (id, items) {
  return {
    type: LIVE_PUSH,
    id,
    items
  };
}
