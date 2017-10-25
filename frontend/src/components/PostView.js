import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loading from 'react-loading';

import { selectPost } from '../actions';
import * as API from '../utils/api';

import PostCtrlBtns from './PostCtrlBtns';
import Post from './Post';
import Comments from './Comments';


class PostView extends Component {

  state = {
    fetchingData: false
  };

  componentDidMount () {

    const { id } = this.props.match.params;
    const { dispatch } = this.props;

    this.setState({ fetchingData: true });
    API
      .getPost(id)
      .then(post => {
        dispatch(selectPost(post));
        this.setState({ fetchingData: false });
      })
      .catch(() => {
        this.setState({ fetchingData: false });
      });
  };

  render () {
    const { fetchingData } = this.state;
    const { post } = this.props;
    return (

      <div className="container">
        {fetchingData ?
          <Loading delay={200} type='spin' color='#222' className='loading'/>
          :
          <div>
            <div className="separator-50"></div>
            {!post ?
              <div className="alert alert-danger text-center" role="alert">
                <strong>Oh snap!</strong> Could not find the post you were looking for.
              </div>
              :
              <div>
                <PostCtrlBtns id={post.id}/>
                <Post post={post}/>
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

function mapStateToProps ({ postsCtrl, categoriesCtrl }) {
  return { post: postsCtrl.selectedPost };
}

export default connect(mapStateToProps)(PostView);