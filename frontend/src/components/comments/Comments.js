import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import { compareFcn } from '../../utils/helpers';

import Comment from './Comment';
import CommentInput from './CommentInput';

/*
  Comments received in props are in form:
  comments: {
    [post0.id]: [comment1, comment2,...],
    [post1.id]: [comment1, comment2,...],
  }
 */
class Comments extends Component {

  render () {

    const { parentId, comments, isFetching } = this.props;
    let compareField = 'voteScore';
    return (
      <div>
        <CommentInput parentId={parentId}/>
        <div className="separator-50"></div>

        {isFetching
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            {comments[parentId] && comments[parentId].length > 0 &&
            <div className="col comments-section">
              {comments[parentId]
                .sort(compareFcn(compareField, false))
                .map(c => (
                  <Comment key={c.id} comment={c}/>
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

function mapStateToProps (state, ownProps) {
  return {
    comments: state.comments.items,
    isFetching: state.comments.isFetching,
    parentId: ownProps.parentId
  };
}

export default connect(mapStateToProps)(Comments);