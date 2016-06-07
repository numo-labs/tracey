import { connect } from 'react-redux';
import Tracey from '../components/tracey';
import * as Actions from '../actions/results';

const mapStateToProps = (state) => {
  const { results: { id, queries, tiles, hotels } } = state;
  return {
    id,
    queries,
    tiles,
    hotels
  };
};

export default connect(mapStateToProps, Actions)(Tracey);
