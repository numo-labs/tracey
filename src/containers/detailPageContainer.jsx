import { connect } from 'react-redux';

import DetailPage from '../components/detailPage';

const mapStateToProps = (state) => {
  const { results } = state;
  return { results };
};

export default connect(mapStateToProps)(DetailPage);
