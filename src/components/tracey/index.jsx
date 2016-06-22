import React from 'react';
import { browserHistory } from 'react-router';

import Header from '../header';

import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import Grid from 'react-bootstrap/lib/Grid';
import Badge from 'react-bootstrap/lib/Badge';

const key_enum = [
  'info',
  'hotels',
  'tiles'
];

class Tracey extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      tab_active_key: 0
    };
    this.handleTabSelection = this.handleTabSelection.bind(this);
  }

  handleTabSelection (key) {
    this.setState({tab_active_key: key});
    browserHistory.push(`/detail/${key_enum[key]}`);
  }

  renderTabs (hotels, tiles) {
    if (Boolean(hotels.length) || Boolean(tiles.length)) {
      return (
        <Nav bsStyle='pills' activeKey={this.state.tab_active_key} onSelect={this.handleTabSelection}>
          <NavItem eventKey={0}>
            General information <Badge>{hotels.length + tiles.length}</Badge>
          </NavItem>
          <NavItem eventKey={1}>
            hotels <Badge>{hotels.length}</Badge>
          </NavItem>
          <NavItem eventKey={2}>
            tiles <Badge>{tiles.length}</Badge>
          </NavItem>
        </Nav>
      );
    }
  }

  render () {
    const { hotels, tiles } = this.props;
    console.log('RESULTS', hotels, tiles);
    return (<div>
      <Header search={this.props.search} />
      <Grid>
        {this.renderTabs(hotels, tiles)}
        <br />
        {this.props.children}
      </Grid>
    </div>);
  }
}

export default Tracey;
