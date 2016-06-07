import { connect } from 'react-redux';

import D3Panel from '../components/d3Panel';

const mapStateToProps = (state) => {
  const { results } = state;
  return { results };
};

export default connect(mapStateToProps)(D3Panel);
