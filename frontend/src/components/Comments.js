import React, { Component } from 'react';
import Loading from 'react-loading';

import * as API from '../utils/api';
import { compareFcn } from '../utils/helpers';

import Comment from './Comment';
import AddComment from './AddComment';

export default class Comments extends Component {

  state = {
    comments: [],
    fetchingData: false
  };

  componentDidMount () {
    const { parentId } = this.props;
    this.setState({ fetchingData: true });
    API
      .getComments(parentId)
      .then(comments => {
        this.setState({
          comments: comments,
          fetchingData: false
        });
      });
  };

  add = (data) => {

    const { parentId } = this.props;
    data = {
      ...data,
      parentId: parentId
    };

    return new Promise(res => {
      API
        .addComment(data)
        .then(comment => {
          this.setState(state => ({
            ...state,
            comments: [...state.comments, comment]
          }));
          res();
        });
    });

  };

  vote = (id, option) => {
    API
      .voteOnComment(id, option)
      .then(comment => {
        this.setState(state => ({
          ...state,
          comments: state.comments.map(c => {
            if (c.id === comment.id) {
              c.voteScore = comment.voteScore;
            }
            return c;
          })
        }));
      })
  };

  render () {

    const { comments, fetchingData } = this.state;
    let compareField = 'voteScore';

    return (
      <div>
        <AddComment addComment={this.add}/>
        <div className="separator-50"></div>

        {fetchingData
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            {comments && comments.length > 0 &&
            <div className="col comments-section">
              {comments
                .sort(compareFcn(compareField, false))
                .map(c => (
                  <Comment key={c.id} comment={c} vote={this.vote}/>
                ))
              }
            </div>
            }
          </div>
        }
        <div className="separator-50"></div>
      </div>
    );
  }
}