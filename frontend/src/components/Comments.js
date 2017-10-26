import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import * as ACTION from '../actions/index';
import * as API from '../utils/api';
import { compareFcn } from '../utils/helpers';

import Comment from './Comment';
import AddComment from './AddComment';

class Comments extends Component {

  state = {
    fetchingData: false
  };

  componentDidMount () {
    const { parentId } = this.props;
    this.setState({ fetchingData: true });
    API
      .getComments(parentId)
      .then(comments => {
        this.props.dispatch(ACTION.loadComments(comments));
        this.setState({ fetchingData: false });
      });
  };


  render () {

    const { fetchingData } = this.state;
    const { parentId, comments } = this.props;
    let compareField = 'voteScore';

    return (
      <div>
        <AddComment parentId={parentId}/>
        <div className="separator-50"></div>

        {fetchingData
          ? <Loading delay={200} type='spin' color='#222' className='loading'/>
          : <div>
            {comments && comments.length > 0 &&
            <div className="col comments-section">
              {comments
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
    comments: state.commentsCtrl.comments,
    parentId: ownProps.parentId
  };
}

export default connect(mapStateToProps)(Comments);