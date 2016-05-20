import React from 'react';
import Tracey from '../components/tracey';

// Get theme setup for material-ui
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../components/theme';

const TraceyContainer = () => (
  <MuiThemeProvider muiTheme={theme}>
    <Tracey />
  </MuiThemeProvider>

);

export default TraceyContainer;
