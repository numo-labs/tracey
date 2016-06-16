import { connect } from 'react-redux';
import Tracey from '../components/tracey';
import * as Actions from '../actions/results';

const mapStateToProps = (state) => {
  const { results: { id, queries, tiles, hotels, raw } } = state;
  return {
    id,
    queries,
    tiles,
    hotels,
    raw
  };
};

export default connect(mapStateToProps, Actions)(Tracey);
