import { connect } from 'react-redux';

import OverviewPage from '../components/overviewPage';

const mapStateToProps = (state) => {
  console.log(state, '>')
  const { results } = state;
  return { results };
};

export default connect(mapStateToProps)(OverviewPage);
