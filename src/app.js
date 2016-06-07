import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Root from './containers/root';
require('./style.css');
const rootElement = document.getElementById('container');

ReactDOM.render(
  <Root />,
  rootElement
);
