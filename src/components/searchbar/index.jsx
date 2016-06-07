import React, { PropTypes } from 'react';

import Button from 'react-bootstrap/lib/Button';
import Form from 'react-bootstrap/lib/Form';
import FormControl from 'react-bootstrap/lib/FormControl';

const propTypes = {
  onSubmit: PropTypes.func.isRequired
};

class Searchbar extends React.Component {
  constructor (props) {
    super(props);
    this.state = {search_field_value: ''};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleEnterOnInputField = this.handleEnterOnInputField.bind(this);
  }

  handleSubmit () {
    this.props.onSubmit(this.state.search_field_value);
  }

  handleEnterOnInputField (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.handleSubmit();
    }
  }

  handleTextChange (event) {
    this.setState({search_field_value: event.target.value});
  }

  render () {
    return (
      <Form inline>
        <FormControl style={{width: '300px'}} type='text' onChange={this.handleTextChange} onKeyPress={this.handleEnterOnInputField} value={this.state.search_field_value} />{' '}
        <Button onClick={this.handleSubmit}>Search</Button>
      </Form>
    );
  }
}

Searchbar.propTypes = propTypes;

export default Searchbar;
