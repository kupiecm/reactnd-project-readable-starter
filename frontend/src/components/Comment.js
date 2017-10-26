import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';

import ToolTipItem from './ToolTipItem';

import { timestampToHuman } from '../utils/helpers';
import * as API from '../utils/api';
import * as ACTION from '../actions/index';

class Comment extends Component {

  vote = (id, option) => {
    API
      .voteOnComment(id, option)
      .then(comment => {
        this.props.dispatch(ACTION.editComment(comment));
      });
  };

  remove = () => {
    const { comment } = this.props;
    console.log(this.props);
    API
      .removeComment(comment.id)
      .then(() => {
        this.props.dispatch(ACTION.removeComment(comment));
      });
  };

  edit = () => {
    const { comment } = this.props;
    this.props.dispatch(ACTION.selectComment(comment));
  };

  render () {
    const { comment } = this.props;

    return (
      <div className="row">
        <div className="col-sm-10">
          <small className="text-muted">@{comment.author}</small>
          <small className="text-muted"
                 style={{ marginLeft: '10px' }}>
            {timestampToHuman(comment.timestamp)}
          </small>
          <small>
            <ToolTipItem id={`edit-${comment.id}`} icon="fa-edit" handler={this.edit} value="edit"/>
          </small>
          <small className="text-muted">
            <ToolTipItem id={`remove-${comment.id}`} icon="fa-remove" handler={this.remove} value="remove"/>
          </small>
        </div>
        <div className="col-sm-2 text-right">
          <Button
            outline className="btn-comment"
            onClick={() => {
              this.vote(comment.id, 'upVote');
            }}>
            <i className="fa fa-plus"></i>
          </Button>
          <span className="text-muted comment-score">{comment.voteScore}</span>
          <Button outline className="btn-comment"
                  onClick={() => {
                    this.vote(comment.id, 'downVote');
                  }}>
            <i className="fa fa-minus"></i>
          </Button>
        </div>
        <div className="col-sm-12">{comment.body}</div>
      </div>
    )
  }
}

function mapStateToProps (state, ownProps) {
  return {
    comment: ownProps.comment
  };
}

export default connect(mapStateToProps)(Comment);