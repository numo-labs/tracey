import React, { Component } from 'react';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory, ignoreScrollBehavior} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import { Button, PageHeader } from 'react-bootstrap';

// Components
import TraceyContainer from './traceyContainer';
import DetailPageContainer from './detailPageContainer';
import D3PanelContainer from './d3PanelContainer';
import OverviewContainer from './overviewContainer';

// Store
import configureStore from '../store/configure-store';
const store = configureStore();
const syncedHistory = syncHistoryWithStore(browserHistory, store);

class Root extends Component {
  constructor () {
    super();
    this.state = {
      token: '',
      loggedIn: false,
      error: false
    };
    this.showLock = this.showLock.bind(this);
  }

  componentWillMount () {
    this.lock = new Auth0Lock('RZLhUdfEWg19ivkAzjQhGMeVAcC93Ck9', 'numo-labs.eu.auth0.com');
  }

  showLock () {
    this.lock.show((err, profile, token) => {
      if (err) {
        console.log('Error signing in', err);
        return null;
      } else {
        localStorage.setItem('userToken', token);
      }
      if (profile.app_metadata && profile.app_metadata.tracey && profile.app_metadata.tracey.R) { // permissions exist and read permission exists
        this.setState({
          token,
          loggedIn: true
        });
      } else {
        this.setState({error: true});
      }
    });
  }

  render () {
    if (!this.state.loggedIn) {
      return (
        <div className='container'>
          <PageHeader style={{textAlign: 'center'}}>Numo Labs Tracey</PageHeader>
          {this.state.error && <div>You do not have permission to view Tracey. Try logging in with a different account or request permission</div>}
          <div style={{width: '50%', margin: '0 auto'}}>
            <Button bsSize='large' block bsStyle='success' onClick={this.showLock}> Login </Button>
          </div>
        </div>
      );
    } else {
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
}

export default Root;
