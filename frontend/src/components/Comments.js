import React, { Component } from 'react';

import * as API from '../utils/api';

import { timestampToHuman, compareFcn } from '../utils/helpers';

import { Button } from 'reactstrap';

export default class Comments extends Component {

  state = {
    comments: []
  };

  componentDidUpdate = (prevProps, prevState) => {

    const { parentId } = this.props;
    prevProps !== this.props && // update state only when new props are sent
    API
      .getComments(parentId)
      .then(comments => {
        this.setState({ comments });
      });
  };

  vote = (id, option) => {
    API
      .voteOnComment(id, option)
      .then(comment => {
        this.setState(state => {
          return {
            ...state,
            comments: state.comments.map(c => {
              if (c.id === comment.id) {
                c.voteScore = comment.voteScore;
              }
              return c;
            })
          }
        });
      })
  };

  render () {

    const { comments } = this.state;
    let compareField = 'voteScore';

    return (
      <section className="col comments-section">
        {
          comments && comments
            .sort(compareFcn(compareField, false))
            .map(comment => (
              <div key={comment.id} className="row">
                <div className="col-sm-10">
                  <small className="text-muted">@{comment.author}</small>
                  <small className="text-muted" style={{marginLeft: '10px'}}>{timestampToHuman(comment.timestamp)}</small>
                </div>
                <div className="col-sm-2 text-right">
                  <Button outline className="btn-comment"
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
                <div className="col">{comment.body}</div>
              </div>
            ))
        }
      </section>
    );
  }
}