import React from 'react';

import Searchbar from '../searchbar';

import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';

const Header = ({search, environment, changeEnvironment}) => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        Tracey
      </Navbar.Brand>
    </Navbar.Header>
    <Nav>
      <NavItem>
        <Searchbar onSubmit={(value, env) => search(value, env)} />
      </NavItem>
    </Nav>
  </Navbar>
);

export default Header;
