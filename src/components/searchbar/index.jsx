import React, { PropTypes } from 'react';

import ButtonGroup from 'react-bootstrap/lib/ButtonGroup';
import Button from 'react-bootstrap/lib/Button';
import DropdownButton from 'react-bootstrap/lib/DropdownButton';
import SplitButton from 'react-bootstrap/lib/SplitButton';
import MenuItem from 'react-bootstrap/lib/MenuItem';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

class Searchbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {search_field_value: '', env: 'ci'};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEnterOnInputField = this.handleEnterOnInputField.bind(this);
    this.handleChangeEnvironment = this.handleChangeEnvironment.bind(this);
  }

  handleSubmit () {
    this.props.onSubmit(this.state.search_field_value, this.state.env);
  }

  handleEnterOnInputField (event) {
    console.log(event);
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  }

  handleChangeEnvironment (env) {
    this.setState({env: env});
  }

  handleTextChange (event) {
    this.setState({search_field_value: event.target.value});
  }

  render () {
    return (
      <Form inline>
        <FormControl style={{width: '300px'}} type='text' onChange={this.handleTextChange} onKeyPress={this.handleEnterOnInputField} value={this.state.search_field_value} />{' '}
        <SplitButton title={'Search ' + this.state.env} key={1} id='search-in-environment-button' onClick={this.handleSubmit}>
          <MenuItem eventKey='1' onClick={() => {
            const env = this.state.env === 'ci' ? 'prod' : 'ci';
            this.handleChangeEnvironment(env);
          }}>
            {this.state.env === 'ci' ? 'Switch to prod' : 'Switch to ci'}
          </MenuItem>
        </SplitButton>
      </Form>
    );
  }
}

Searchbar.propTypes = propTypes;

export default Searchbar;
