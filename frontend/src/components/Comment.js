import React, { Component } from 'react';
import { timestampToHuman } from '../utils/helpers';
import { Button } from 'reactstrap';

const Comment = ({comment, vote}) => (
  <div className="row">
    <div className="col-sm-10">
      <small className="text-muted">@{comment.author}</small>
      <small className="text-muted"
             style={{ marginLeft: '10px' }}>{timestampToHuman(comment.timestamp)}</small>
    </div>
    <div className="col-sm-2 text-right">
      <Button outline className="btn-comment"
              onClick={() => {
                vote(comment.id, 'upVote');
              }}>
        <i className="fa fa-plus"></i>
      </Button>
      <span className="text-muted comment-score">{comment.voteScore}</span>
      <Button outline className="btn-comment"
              onClick={() => {
                vote(comment.id, 'downVote');
              }}>
        <i className="fa fa-minus"></i>
      </Button>
    </div>
    <div className="col">{comment.body}</div>
  </div>
);

export default Comment;