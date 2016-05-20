import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

// Components
import TraceyContainer from './containers/traceyContainer';

// Store
import configureStore from './store/configure-store';
const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);
const rootElement = document.getElementById('container');

ReactDOM.render(
  <Provider store={store}>
    <Router history={syncedHistory}>
      <Route path='/' component={TraceyContainer}>

      </Route>
    </Router>
  </Provider>,
  rootElement
);
