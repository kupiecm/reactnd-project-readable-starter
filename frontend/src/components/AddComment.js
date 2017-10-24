import React, { Component } from 'react';

import * as API from '../utils/api';

import { Form, FormGroup, Input, Button } from 'reactstrap';
import uuid from 'uuid';

export default class AddComponent extends Component {

  state = {
    author: '',
    body: ''
  };

  handleChange (e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value })
  }

  handleSubmit (e) {
    const { addComment } = this.props;
    e.preventDefault();

    let data = {
      id: uuid.v4(),
      timestamp: (new Date()).getTime(),
      body: this.state.body,
      author: this.state.author
    };

    addComment(data)
      .then(() => {
        this.setState({ author: '', body: '' });
      });
  };

  render () {

    return (
      <div className="col add-comment-form">
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup row>
            <div className="col-1 text-center user-img">
              <i className="fa fa-user-circle fa-3x"></i>
            </div>
            <div className="col-11">
              <Input
                type="textarea"
                name="body"
                id="body"
                placeholder="Start the discussion..."
                value={this.state.body}
                onChange={this.handleChange.bind(this)}/>
            </div>
          </FormGroup>
          <FormGroup row>
            <div className="col-1">
            </div>
            <div className="col-9">
              <Input
                type="text"
                name="author"
                id="author"
                placeholder="Enter your nickname..."
                value={this.state.author}
                onChange={this.handleChange.bind(this)}/>
            </div>
            <div className="col-2 text-right">
              <Button color="info">Submit</Button>
            </div>
          </FormGroup>
        </Form>
      </div>
    )
  }
}