import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import { fetchPost } from '../../actions/index';

import PostEditRemoveBtns from './PostEditRemoveBtns';
import Post from './Post';
import Comments from '../comments/Comments';


class PostView extends Component {

  componentWillMount () {

    const { id } = this.props.match.params;
    const { selectedPost, dispatch } = this.props;

    if (!selectedPost) {
      // fetch post when user directly puts post id in url, without first visiting main view
      dispatch(fetchPost(id));
    }
    // otherwise, post is already selected in store and no need to make an extra API call
  };

  render () {
    const { post, comments, isFetching } = this.props;
    return (

      <div className="container">
        {isFetching ?
          <Loading delay={200} type='spin' color='#222' className='loading'/>
          :
          <div>
            <div className="separator-50"></div>
            {!post || post.deleted ?
              <div className="alert alert-danger text-center" role="alert">
                <strong>Oh snap!</strong> Could not find the post you were looking for.
              </div>
              :
              <div>
                <PostEditRemoveBtns post={post}/>
                <Post post={post} comments={comments[post.id]}/>
                <div className="separator-50"></div>
                <Comments parentId={post.id}/>
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps ({ posts, comments }) {
  return {
    post: posts.selectedPost,
    isFetching: posts.isFetching,
    comments: comments.items,
  };
}

export default connect(mapStateToProps)(PostView);