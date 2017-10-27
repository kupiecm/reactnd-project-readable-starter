import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Button } from 'reactstrap';

import { addComment, editComment } from '../../actions/index';
import uuid from 'uuid';

class CommentInput extends Component {

  state = {
    author: '',
    body: ''
  };

  componentDidUpdate (prevProps) {
    const { selectedComment } = this.props;
    if (prevProps.selectedComment !== selectedComment)
      this.setState({
        author: selectedComment ? selectedComment.author : '',
        body: selectedComment ? selectedComment.body : ''
      });
  };

  handleChange (e) {
    e.preventDefault();
    this.setState({ [e.target.id]: e.target.value })
  };

  handleSubmit (e) {
    const { parentId, selectedComment, dispatch } = this.props;
    e.preventDefault();

    if (selectedComment) {
      let editedComment = {
        ...selectedComment,
        timestamp: (new Date()).getTime(),
        body: this.state.body,
      };
      dispatch(editComment(editedComment))
        .then(() => this.setState({ author: '', body: '' }));
      return;
    }

    let newComment = {
      id: uuid.v4(),
      parentId: parentId,
      timestamp: (new Date()).getTime(),
      body: this.state.body,
      author: this.state.author
    };

    dispatch(addComment(newComment))
      .then(() => this.setState({ author: '', body: '' }));
  };

  render () {

    const { selectedComment } = this.props;
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
                disabled={selectedComment}
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

function mapStateToProps (state, ownProps) {
  return {
    selectedComment: state.comments.selectedComment,
    parentId: ownProps.parentId
  };
}

export default connect(mapStateToProps)(CommentInput);