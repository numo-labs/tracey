import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, ignoreScrollBehavior} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

// Components
import TraceyContainer from './traceyContainer';
import DetailPageContainer from './detailPageContainer';
import D3PanelContainer from './d3PanelContainer';
import OverviewContainer from './overviewContainer';

// Store
import configureStore from '../store/configure-store';
const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);

class Root extends React.Component {
  render () {
    return (
      <Provider store={store}>
        <Router history={syncedHistory}>
          <Route path='/' component={TraceyContainer} ignoreScrollBehavior>
            <Route path='detail/info' component={OverviewContainer} />
            <Route path='detail/:items' component={DetailPageContainer}>
              <Route path='item/:itemIndex' component={D3PanelContainer} />
            </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default Root;
