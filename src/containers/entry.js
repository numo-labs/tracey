import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as Actions from '../actions/auth.js';
import Tracey from './traceyContainer.jsx';
import { Button, PageHeader } from 'react-bootstrap';

export class Entry extends Component {

  constructor () {
    super();
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
      if (profile.app_metadata.tracey) { // permissions exist and read permission exists
        console.log('permissions', profile.app_metadata.tracey);
        this.props.savePermissions(token);
      } else {
        this.props.setLoginError();
      }
    });
  }

  render () {
    if (!this.props.loggedIn) {
      return (
        <div className='container'>
          <PageHeader style={{textAlign: 'center'}}> Numo Labs Request Tracing Viewer </PageHeader>
          {this.props.loginError && <div>You do not have permission to view Tracey. Try logging in with a different account or request permission</div>}
          <div style={{width: '50%', margin: '0 auto'}}>
            <Button bsSize='large' block bsStyle='success' onClick={this.showLock}> Login </Button>
          </div>
        </div>
      );
    } else {
      return (
        <Tracey />
      );
    }
  }
}

Entry.propTypes = {
  loginError: PropTypes.bool,
  loggedIn: PropTypes.bool,
  setLoginError: PropTypes.func,
  savePermissions: PropTypes.func
};

function mapStateToProps (state) {
  const {
    auth: {
      loginError,
      loggedIn
    }
   } = state;

  return {
    loginError,
    loggedIn
  };
}

export default connect(mapStateToProps, Actions)(Entry);