import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import {Toolbar, ToolbarGroup} from 'material-ui/Toolbar';
import TextField from 'material-ui/TextField';
import {blue500} from 'material-ui/styles/colors';

const CustomToolBar = () => (
  <Toolbar color={blue500}>
    <ToolbarGroup color={blue500}>
      <FontIcon className='muidocs-icon-replace-find' />
      <TextField hintText='Give me an id...' />
    </ToolbarGroup>
  </Toolbar>
);

export default CustomToolBar;
