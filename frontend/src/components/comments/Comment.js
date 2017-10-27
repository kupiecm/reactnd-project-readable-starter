import React, { Component } from 'react';
import { connect } from 'react-redux';

import ToolTipItem from './ToolTipItem';
import Vote from '../Vote';

import { removeComment, selectComment } from '../../actions/index';
import { timestampToHuman } from '../../utils/helpers';


class Comment extends Component {

  remove = () => {
    const { comment, dispatch } = this.props;
    dispatch(removeComment(comment.id));
  };

  edit = () => {
    const { comment, dispatch } = this.props;
    dispatch(selectComment(comment));
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
          <Vote item={comment} type="comments"/>
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